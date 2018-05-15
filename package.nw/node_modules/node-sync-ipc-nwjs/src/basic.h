
#define DEBUG 0
#define MAX_BUFFER_LENGTH 2000
#ifdef _WIN32
#include    <tlhelp32.h>
#else
#include <unistd.h>
#include <sys/types.h>
#include <pwd.h>
#endif