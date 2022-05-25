# 注意事项：切换分支，旧包记得修改成m6模版
# 第一步拉取phpsaash5，切换某分支上
cd ../phpzspsaas
# 本地第一次提交
git checkout -b platform/dev
# 后续更新h5
git checkout platform/dev
git pull origin platform/dev
cd ../saas-drag
# 打包

npm run build:h5
cp -R -f ./dist/build/h5 ../phpzspsaas/public
cd ../phpzspsaas/public
rm -rf platform
mv h5 platform
# Git
git add -A
date=`date +%Y-%m-%d_%H:%M:%S`
git commit -m "deploy ${date}"
git push origin platform/dev