# node-config 翻译 #

可以使用 `NODE_CONFIG_DIR` 环境变量控制配置文件目录

### 文件读取顺序 ###

	default.EXT
	default-{instance}.EXT
	{deployment}.EXT
	{deployment}-{instance}.EXT
	{short_hostname}.EXT
	{short_hostname}-{instance}.EXT
	{short_hostname}-{deployment}.EXT
	{short_hostname}-{deployment}-{instance}.EXT
	{full_hostname}.EXT
	{full_hostname}-{instance}.EXT
	{full_hostname}-{deployment}.EXT
	{full_hostname}-{deployment}-{instance}.EXT
	local.EXT
	local-{instance}.EXT
	local-{deployment}.EXT
	local-{deployment}-{instance}.EXT
	(Finally, custom environment variables can override all files)

其中 EXT 是拓展名，可以是yml，yaml，xml，json 等等
{instance} 是一个可选的示例名，见[多实例部署](多实例部署)
{short_hostname}是你服务器到第一个点的名字，来自 $HOST 或者 $HOSTNAME 或者 os.hostname()
{full_hostname} 是完整的服务名
{deployment} 是部署名，来自 $NODE_ENV 或者 $NODE_CONFIG_ENV 环境变量
default.EXT 是用于被其他文件覆盖的