#include <node.h>
#include <uv.h>
#include <nan.h>
#include <vector>
#include "basic.h"

/**
	Server side of the pipe
*/
namespace server {

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;
    using v8::Number;

	/* 
	* Struct Client
	* Server Keeps a List of Clients to send message to the correct client (by pid searching)
	*/
	typedef struct {
        uv_pipe_t* client_handle; /* the uv_pip handle of this client */
        int pid; /* the process id of this client process*/
        int mLen; /* the expected length of the next message */
        char* message; /* the received message */
    } client;

	
	/* The writing request list node. 
	If the data is very long, the request is repesented as a linked list. */
    struct write_req_s{
        uv_write_t req; /*libuv's writing structure */
        uv_buf_t buf; /* content buffer to write*/
		write_req_s* next; /* the next writing request */
        int pid; /* target client pid*/
    } ;

    typedef struct write_req_s write_req_t;

	/* The server-side uv_pipe handle */
    uv_pipe_t * server_handle;

	/* The list of clients*/
    std::vector<client *> clients;

	/* Callback function to be executed when messsage received from clients */
    Nan::Callback* pipe_callback = new Nan::Callback();

	/* when new client connected */
    void on_new_connection(uv_stream_t *q, int status);

	/* stop the server*/
    void stop_server();

	/* do single wirte action. This function will be called recursively if req->next is not NULL */
    void write(write_req_t* req);

	/* get the pid of current process (server-side) */
    int _getpid(){
        #ifdef _WIN32
        return GetCurrentProcessId();
        #else
        return getpid();
        #endif
    }

	/* get the digital length of an integer */
	int getIntDigits(int num) {

		int digits = 0;

		while (num>0) {
			digits += 1;
			num /= 10;
		}

		return digits;
	}

	const char* ToCString(const String::Utf8Value& value) {
		return *value ? *value : "<string conversion failed>";
	}
	
	/* get the name of the pipe (in Unix it is the name of the sock file) */
    char * getPipename(){

        char * pipename;

        int pid = _getpid();

        int pid_digits = 0;

        int temp = pid;

        while(temp>0){
           pid_digits += 1;
           temp /= 10;
        }

        #ifdef _WIN32
        const char* pipename_preset = "\\\\.\\pipe\\nodePipe";
        pipename = (char *) malloc(sizeof(char) * (strlen(pipename_preset)+pid_digits+1));
        sprintf(pipename,"%s%d",pipename_preset,pid);
        #else
        const char *homedir;
        if ((homedir = getenv("HOME")) == NULL) {
            homedir = getpwuid(getuid())->pw_dir;
        }
        const char* pipename_preset = "nodePipe";
        pipename = (char *) malloc(sizeof(char) * (strlen(pipename_preset)+pid_digits+strlen(homedir)+7));
        sprintf(pipename,"/%s/%s%d.sock",homedir,pipename_preset,pid);
        #endif

        return pipename;
    }

	/* add a client to the client list */
    void add_client(int pid, uv_pipe_t* client_handle){

        client * c = (client *) malloc(sizeof(client));

        c->client_handle = client_handle;

        c->pid = pid;

        c->message = NULL;

        clients.push_back(c);

    }

	/* delete client by uv_pipe handle*/
    void delete_client(uv_pipe_t* ch){

         for(std::vector<client *>::iterator it=clients.begin(); it!=clients.end(); ){
            if((*it)->client_handle == ch)
            {
                if((*it)->message != NULL){
                    free((*it)->message);
                }
                it = clients.erase(it);
            }
            else
            {
                ++it;
            }
         }
    }

	/* get client by pid*/
    client* get_client(int pid){
        client * c = NULL;

        int count = clients.size();
        for (int i = 0; i < count;i++)
        {
            if(clients.at(i)->pid == pid){
                return clients.at(i);
            }
        }
        return c;
    }

	/* get client by uv_pipe handle */
    client* get_client(uv_pipe_t* ch){

         for(std::vector<client *>::iterator it=clients.begin(); it!=clients.end(); ){
            if((*it)->client_handle == ch)
            {
                return *it;
            }
            it++;
         }

         return NULL;
    }

    void alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf) {
      buf->base = (char *) malloc(suggested_size);
      buf->len = suggested_size;
    }

    void free_write_req(uv_write_t *req) {
        write_req_t *wr = (write_req_t*) req;
        free(wr->buf.base);
        free(wr);
    }
	
	/* extract the first Interger before '#' */
    void extractFirstInteger(char * origin, int * firstInt, char ** rest){


        int count = strlen(origin);
        int i = 0;
        while(origin[i] != '#' && origin[i]){
            i++;
            if(i >= count){
                break;
            }
        }

        if(i >= count){
            return;
        }

        char * pidSub = (char *) malloc(sizeof(char) * (i+1));
        memcpy( pidSub, origin, i );
        pidSub[i] = '\0';
        *firstInt = atoi(pidSub);
        free(pidSub);

        *rest = (char *) malloc(sizeof(char) * (strlen(origin)-i));
        memcpy(*rest, origin +i+1,strlen(origin)-i-1);
        (*rest)[strlen(origin)-i-1] = '\0';

    }

	/*callback when server is closed */
    void on_server_closed(uv_handle_t * server){
        if(DEBUG) fprintf(stderr, "on server closed called \n");
        free(server);
        server_handle = NULL;
    }

	/* when client uv_pipe handle is closed*/
    void on_client_closed(uv_handle_t * client){
        free(client);
    }

    void on_client_closed_when_stop(uv_handle_t * client){
        free(client);
        if(clients.size() == 0){
            uv_close((uv_handle_t *) server_handle,on_server_closed);
        }
    }

	/* when data received from client */
    void on_read_data(uv_stream_t *cli, ssize_t nread, const uv_buf_t *buf) {

        client* c = NULL;

        if (nread > 0) {

            char * buffer = (char *) malloc(nread+1);
            memcpy(buffer,buf->base,nread);
            buffer[nread] = 0;
            if(DEBUG) fprintf(stdout,"Server Read Length %ld \n",nread);

            int pid;
            char * message;
            c = get_client((uv_pipe_t *) cli);

            if(c == NULL){
                extractFirstInteger(buffer,&pid,&message);
                add_client(pid ,(uv_pipe_t *) cli);
                if(DEBUG) fprintf(stdout,"The current size of clients is %d\n", clients.size());
                c = get_client((uv_pipe_t *) cli);
                free(buffer);
            }
            else{
                message = buffer;
            }

            char *body;

			// If the client's message is NULL, get the length of this message
			// The message is formatted as length#body
            if(c->message == NULL){
                int fullLen = 0;

                extractFirstInteger(message,&fullLen,&body);

                if(DEBUG) fprintf(stdout,"the total length of this message is %d\n", fullLen);
                c->mLen = fullLen;
                c->message = (char *) malloc( fullLen + 1);
                for(int i = 0; i <  fullLen + 1; i++){
                    c->message[i] = 0;
                }
                free(message);
                strcat(c->message, body);
                free(body);
            }
            else{
                strcat(c->message, message);
                free(message);
            }

            if(DEBUG) fprintf(stdout,"server received %d / %d\n", strlen(c->message),c->mLen);

            if(strlen(c->message) == c->mLen){
                if(!pipe_callback->IsEmpty()){

                    Nan::HandleScope scope;
                    v8::Local<v8::Value> argv[2];

                    argv[0] = Nan::New<v8::Number>(c->pid);

                    argv[1] = Nan::New(c->message).ToLocalChecked();

                    if(DEBUG) fprintf(stdout,"callback %s\n",c->message);

                    pipe_callback->Call(2, argv);

                    free(c->message);

                    c->message = NULL;
                }
            }


        }

        else if (nread < 0) {
            if(DEBUG) fprintf(stderr, "Server Read error %s\n", uv_err_name(nread));
            if (nread != UV_EOF)
                if(DEBUG) fprintf(stderr, "Server Read error %s\n", uv_err_name(nread));
            delete_client((uv_pipe_t *) cli);
            uv_close((uv_handle_t*) cli, on_client_closed);
            if(DEBUG) fprintf(stdout,"clients count after delete %d\n", clients.size());
        }

        free(buf->base);
    }

	/* create server-side uv_pipe handle and start listening */
    void create_server(){


        server_handle = (uv_pipe_t *) malloc(sizeof(uv_pipe_t));
        uv_pipe_init(uv_default_loop(), server_handle, 0);

        int r;

        if ((r = uv_pipe_bind(server_handle, getPipename()))) {
            if(DEBUG) fprintf(stderr, "Bind error %s\n", uv_err_name(r));
            return;
        }
        if ((r = uv_listen((uv_stream_t*) server_handle, 128, on_new_connection))) {
            if(DEBUG) fprintf(stderr, "Listen error %s\n", uv_err_name(r));
            return;
        }

    }

	void on_new_connection(uv_stream_t *server, int status) {

		if (status == -1) {
			// error!
			if (DEBUG) fprintf(stderr, "connected error %d \n", status);
			return;
		}
		if (DEBUG) fprintf(stderr, "connected %d \n", status);
		uv_pipe_t* client = (uv_pipe_t *)malloc(sizeof(uv_pipe_t));
		uv_pipe_init(uv_default_loop(), client, 0);
		if (uv_accept(server, (uv_stream_t*)client) == 0) {
			if (DEBUG) fprintf(stderr, "accepted \n");
			uv_read_start((uv_stream_t*)client, alloc_buffer, on_read_data);
		}
		else {
			if (DEBUG) fprintf(stderr, "read start error \n");
			uv_close((uv_handle_t*)client, on_client_closed);
		}
	}

    void write_cb(uv_write_t* req, int status) {

       if (status < 0) {
               if(DEBUG) fprintf(stderr, "Server Write error %s\n", uv_err_name(status));
       }
       write_req_t* wr = (write_req_t* )req;
       if(wr->next != NULL){
            write_req_t* next = wr->next;
            next->pid = wr->pid;
            write(next);
       }
       wr->next = NULL;
       free(wr->buf.base);
       free(wr);
    }

    void write(write_req_t* req){
        if(DEBUG) fprintf(stdout, "Server Write %s\n", req->buf.base);
        uv_write(&req->req,(uv_stream_t *) get_client(req->pid)->client_handle , &req->buf, 1, write_cb);
    }

	/* create a writing request chain for wirting. */
	write_req_t* createWriteReqChain(char * buffer) {

		write_req_t *head = (write_req_t*)malloc(sizeof(write_req_t));

		int offset = 0;

		int fullLen = strlen(buffer);

		write_req_t *cur = head;

		do {

			cur->next = (write_req_t*)malloc(sizeof(write_req_t));

			int len = std::min(fullLen - offset, MAX_BUFFER_LENGTH);
			char *buf;
			if (offset == 0) {
				int bufLen = len + getIntDigits(fullLen) + 1;
				buf = (char *)malloc(bufLen + 1);
				sprintf(buf, "%d#", fullLen);
				memcpy(buf + getIntDigits(fullLen) + 1, buffer + offset, len);
				buf[bufLen] = 0;
			}
			else {
				buf = (char *)malloc(len + 1);
				memcpy(buf, buffer + offset, len);
				buf[len] = 0;
			}
			cur->next->buf = uv_buf_init(buf, strlen(buf));
			cur = cur->next;
			offset += len;
		} while (offset < fullLen);

		cur->next = NULL;
		free(buffer);
		cur = head->next;
		free(head);

		return cur;
	}

    void stop_server(){

        if(DEBUG) fprintf(stdout, "start stopping server \n");

        if(server_handle != NULL && uv_is_active((uv_handle_t *) server_handle)){

            if(DEBUG) fprintf(stderr,"current connected clients length is %d",uv_pipe_pending_count(server_handle));

            #ifdef _WIN32
            #else
			// delete sock file on unix based systems.
            uv_fs_t* req = (uv_fs_t *) malloc(sizeof(uv_fs_t));
            int r = uv_fs_unlink(uv_default_loop(), req, getPipename(), (uv_fs_cb) free);
            if(r != 0){
                if(DEBUG) fprintf(stderr, "delete sock error %s\n", uv_err_name(r));
            }
            #endif

            if(clients.size() > 0){
                for(std::vector<client *>::iterator it=clients.begin(); it!=clients.end(); ){
                    uv_close((uv_handle_t *) (*it)->client_handle, on_client_closed_when_stop);
                    it = clients.erase(it);
                }
            }
            else{
                uv_close((uv_handle_t *) server_handle,on_server_closed);
            }

        }
    }

	

	/* stop the server */
    NAN_METHOD(stop){

        stop_server();
        return;

    }

	/* create the server */
    NAN_METHOD(createServer){

        create_server();
        return;

    }

	

	/* write to the target client */
    NAN_METHOD(write){
        if (info.Length() > 1) {
            if (info[1]->IsString() && info[0]->IsNumber()) {


              String::Utf8Value str(info[1]->ToString());

              char * buffer = strdup(ToCString(str));

              write_req_t *req = createWriteReqChain(buffer);

              int pid = (int) Local<Number>::Cast(info[0])->NumberValue();

              client* c = get_client(pid);



              if(c != NULL){
                 req->pid = c->pid;
                 write(req);
              }
              else{
                if(DEBUG) fprintf(stderr,"client is null");
              }

              return;
            }
        }
    }

	/* bind a listener function to receive message.*/
    NAN_METHOD(bindPipeListener){

        if (!info[0]->IsFunction()) {
            Nan::ThrowTypeError("First argument must be a function");
            return;
        }

        pipe_callback->Reset(info[0].As<v8::Function>());


    }


    NAN_MODULE_INIT(init) {

        Nan::SetMethod(target, "stop", stop);
        Nan::SetMethod(target, "startServer", createServer);
        Nan::SetMethod(target, "write", write);
        Nan::SetMethod(target, "bindPipeListener", bindPipeListener);

    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)


}



