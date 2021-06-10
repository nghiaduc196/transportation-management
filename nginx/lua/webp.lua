function file_exists(name)
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end
function getPath(str,sep)
    sep=sep or'/'
    return str:match("(.*"..sep..")")
end
local originalFile = ngx.var.request_filename;
local newFile = "/var/www/webp" .. originalFile .. ".webp"
if not file_exists(originalFile) then
    ngx.exit(404);
    return;
end
os.execute("mkdir -p -m 777 " .. getPath(newFile));
executeCmd = "cwebp -q 90 "
if (ngx.var.arg_w ~= nil or ngx.var.arg_h ~= nil) then
    if(ngx.var.arg_w ~= nil) then w = ngx.var.arg_w else w = 400 end
    if(ngx.var.arg_h ~= nil) then h = ngx.var.arg_h else h = 0 end
    executeCmd = executeCmd .. "-resize " .. w .. " " .. h .. " "
    newFile = "/var/www/webp" .. originalFile .. "-" .. w .. "x" .. h .. ".webp"
end
executeCmd = executeCmd .. originalFile  .. " -o " .. newFile
os.execute(executeCmd);
if file_exists(newFile) then
    fileHandle = io.open(newFile, 'rb')
    data = fileHandle:read('*a')
    ngx.header["Content-Type"] = "image/webp"
    ngx.print(data)
else
    --Debug code start
    file = io.open ("/usr/local/openresty/nginx/logs/file.log" ,"a")
    file:write("\n")
    file:write(executeCmd)
    file:write("\n")
    file:close()
    --Debug code end
    fileHandle = io.open(originalFile, 'rb')
    data = fileHandle:read('*a')
    ngx.print(data)
end