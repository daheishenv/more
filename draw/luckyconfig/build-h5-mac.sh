# 注意事项：切换分支，旧包记得修改成m6模版
# 第一步拉取phpsaash5，切换某分支上
cd ../phpzspsaas
# 本地第一次提交
git checkout -b master-v3.2
git checkout master-v3.2
git pull origin master
git pull origin master-v3.2
cd ../saas-drag
# 打包
yarn add zzsp-saas-ui@latest && npm run build:h5
cp -R -f ./dist/build/h5 ../phpzspsaas/public
cd ../phpzspsaas/public
rm -rf big_wheel
mv h5 big_wheel
# Git
git add -A
date=`date +%Y-%m-%d_%H:%M:%S`
git commit -m "deploy ${date}"
git push origin master-v3.2
