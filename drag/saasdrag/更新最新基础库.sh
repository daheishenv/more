# try
# { 
#     yarn add zzsp-saas-ui@latest
# } 
# catch 
# { 
#     npm i zzsp-saas-ui@latest
# }

if [ -z "$yarn" ]; then
  yarn add zzsp-saas-ui@latest
else
  npm i zzsp-saas-ui@latest
fi