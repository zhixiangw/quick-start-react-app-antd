#!/bin/bash

## 文件参数定义
S_PATH=/data/wwwroot/movie-admin # 服务器目录
ALL_SERVER="shouer_arm" # 全部服务器

DIST_DIR=./dist # 项目编译目录
DIST_FILE=dist.zip # 压缩文件名

## 帮助信息
helper() {
    echo "Usage:"
    echo "upload.sh -h SERVER_HOST [-b BUILD]"
    echo "Description:"
    echo "SERVER_HOST,服务器名称,建议在~/.ssh/config中配置."
    echo "BUILD,是否编译."
    exit -1
}

## 获取参数
BUILD="false"
HOST="-"

while getopts 'h:b' OPT; do
    case $OPT in
        h) HOST="$OPTARG";;
        b) BUILD="true";;
        ?) helper;;
    esac
done

## 全部
if [ "$HOST" == 'all' ]
then
  HOST=$ALL_SERVER
elif [ X"$HOST" == '-' ]
then
  printf "***请输入SERVER_HOST参数***\n";
  helper;
  exit -1;
elif [[ $ALL_SERVER != *$HOST* ]]
then
  printf "***SERVER_HOST参数仅支持:${ALL_SERVER},当前输入:${HOST}\n";
  helper;
  exit -1;
fi

# 删除dist && 编译
if [ $BUILD == 'true' ]
then
  printf ">>> 开始编译项目...\n";
  rm -rf $DIST_FILE
  yarn build
fi

## 没有zip文件
if ! test -f "$DIST_FILE"; then
  # 压缩
  printf ">>> 正在压缩文件${DIST_FILE}...\n";
  zip -r -q "${DIST_FILE}" "${DIST_DIR}" -x "*.DS_Store"
fi


## 服务器部署
HOSTARR=(${HOST//,/ })  
for SERVER in ${HOSTARR[@]}
do
  # 上传代付
  SERVER_SPACE="${SERVER}:${S_PATH}"
  printf ">>> 正在上传文件${DIST_FILE} 到 ${SERVER_SPACE}...\n";
  scp -q "${DIST_FILE}" "${SERVER_SPACE}/dist.zip"
  
  printf ">>> 部署服务器 ${SERVER}\n";
  ssh -t -t "${SERVER}" > /dev/null 2>&1  << eeooff
  cd "${S_PATH}"
  rm -rf dist && unzip dist.zip
  exit
eeooff
  printf "**** 完成部署 ${SERVER} ****\n\n";
done

echo ">>> ALL DONE!";
