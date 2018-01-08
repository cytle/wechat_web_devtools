#include <node.h>
#include <uv.h>
#include <nan.h>
#include <string.h>
#include "basic.h"


namespace client {

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;
    using v8::Number;

    char * returnValue;

    char * writeValue;

    char * pipename;

    uv_pipe_t* client_handle;

    uv_loop_t * ipc_loop = NULL;

    int pid;

    int pid_digits;

    int parent_pid;

    typedef struct {
        uv_write_t req;
        uv_buf_t buf;
    } write_req_t;

    const char* ToCString(const String::Utf8Value& value) {
          return *value ? *value : "<string conversion failed>";
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

    void on_client_closed(uv_handle_t * client){

        free(client);
    }


    void on_read_value(uv_stream_t *client, ssize_t nread, const uv_buf_t *buf) {

        if (nread > 0) {

            returnValue = (char *) malloc(nread+1);
            memcpy(returnValue,buf->base,nread);
            returnValue[nread] = 0;

            if(DEBUG) fprintf(stdout,"Client Read %ld: %s \n",nread,returnValue);

            uv_read_stop(client);
            uv_close((uv_handle_t *) client,on_client_closed);

        }

        if (nread < 0) {
            if (nread != UV_EOF)
                if(DEBUG) fprintf(stderr, "Read error %s\n", uv_err_name(nread));
            uv_close((uv_handle_t*) client, on_client_closed);
        }

        free(buf->base);
    }

    void write_cb(uv_write_t* req, int status) {
       if (status != 0) {
               if(DEBUG) fprintf(stderr, "Client Write error %s\n", uv_err_name(status));
       }
       free_write_req(req);
    }

    void on_client_connected(uv_connect_t* req, int status){

        if (status != 0) {
            // error!
            if(DEBUG) fprintf(stdout,"client connection error %s\n", uv_err_name(status));

        }

        else{

            if(DEBUG) fprintf(stdout,"client connected %d \n", status);

            uv_read_start((uv_stream_t*) req->handle, alloc_buffer, on_read_value);


            char *buffer = (char *) malloc(sizeof(char)*(pid_digits+1+strlen(writeValue)+1));
            sprintf(buffer,"%d#%s",pid,writeValue);
            buffer[pid_digits+1+strlen(writeValue)] = 0;


            if(DEBUG) fprintf(stdout,"client write %s \n", buffer);

            write_req_t *wreq = (write_req_t*) malloc(sizeof(write_req_t));

            wreq->buf = uv_buf_init(buffer, strlen(buffer));

            uv_write(&wreq->req, (uv_stream_t *)client_handle, &wreq->buf, 1, write_cb);

        }

        free(writeValue);

        free(req);

    }

    void connect(){

           ipc_loop = (uv_loop_t *) malloc(sizeof(uv_loop_t));

           uv_loop_init(ipc_loop);

           uv_connect_t* req = (uv_connect_t *) malloc(sizeof(uv_connect_t));

           client_handle = (uv_pipe_t *) malloc(sizeof(uv_pipe_t));

           uv_pipe_init(ipc_loop, client_handle,0);



           uv_pipe_connect(req, client_handle, pipename, on_client_connected);

           uv_run(ipc_loop,UV_RUN_DEFAULT);

           if(DEBUG) fprintf(stdout,"connect loop successfully closed\n");

           uv_loop_close(ipc_loop);

           free(ipc_loop);

        }

    NAN_METHOD(setPid){
        if (info.Length() > 0) {
            if (info[0]->IsNumber()) {

                int parent_pid = (int) Local<Number>::Cast(info[0])->NumberValue();
                int temp = parent_pid;
                int parent_pid_digits = 0;
                while(temp>0){
                   parent_pid_digits += 1;
                   temp /= 10;
                }
                #ifdef _WIN32
                const char* pipename_preset = "\\\\.\\pipe\\nodePipe";
                pipename = (char *) malloc(sizeof(char) * (strlen(pipename_preset)+parent_pid_digits+1));
                sprintf(pipename,"%s%d",pipename_preset,parent_pid);
                #else
                const char *homedir;
                if ((homedir = getenv("HOME")) == NULL) {
                    homedir = getpwuid(getuid())->pw_dir;
                }
                const char* pipename_preset = "nodePipe";
                pipename = (char *) malloc(sizeof(char) * (strlen(pipename_preset)+parent_pid_digits+strlen(homedir)+7));
                sprintf(pipename,"/%s/%s%d.sock",homedir,pipename_preset,parent_pid);
                #endif

            }
        }
    }

    NAN_METHOD(send){

        if (info.Length() > 0) {

            if (info[0]->IsString()) {

                  String::Utf8Value str(info[0]->ToString());

                  const char* s = ToCString(str);

                  writeValue = strdup(s);

                  if(DEBUG) fprintf(stdout, "send Sync %s \n", writeValue);

                  connect();

                  if(returnValue != NULL){
                    info.GetReturnValue().Set(Nan::New<v8::String>(returnValue).ToLocalChecked());
                    free(returnValue);

                    returnValue = NULL;
                    return;
                  }
                  else{
                    Nan::ThrowError("Failed To Send Sync");
                  }

            }
        }

        info.GetReturnValue().Set(Nan::Null());


    }

    int _getpid(){
        #ifdef _WIN32
        return GetCurrentProcessId();
        #else
        return getpid();
        #endif
    }

    NAN_MODULE_INIT(init) {
      Nan::SetMethod(target, "sendSync", send);
      Nan::SetMethod(target, "setParentPid", setPid);

        pid = _getpid();

        pid_digits = 0;

        int temp = pid;

        while(temp>0){
           pid_digits += 1;
           temp /= 10;
        }
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)



}




