var express = require('express');
var router = express.Router();
// const listData = require('../data/list.json')
const List = require('../Schema/schemaList.js');
const User = require('../Schema/schemaUser.js');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const crypto = require('crypto');


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

 //存储数据
  // let list1 = new myList({
  //   name:   'hyk',
  //   address:'龙游县湖镇',
  // })

  // list1.save()
  // .then(res => {
  //   console.log('存储成功')
  // })
  // .catch(err => {
  //   console.log('存储失败')
  // })

//首页list
const myList = mongoose.model('myList',List)
//用户信息
const myUser = mongoose.model('myUser',User)



let errData = {
  sc:-1
}
let successData = {
  sc:0
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//账户注册
router.post('/sign',urlencodedParser,function(req,res,next){
    let reqData = JSON.parse(req.body.data)
    
    if (reqData.userName != ''&&reqData.passWord != '') {
      myUser.find({'userName':reqData.userName})
      .then(findres => {//查找数据库中是否已经存在该用户名
        let content = reqData.passWord;//密码
        let md5 = crypto.createHash('md5');//MD5加密算法
        md5.update(content);
        let sign = md5.digest('hex');

        if (findres.length == 0) {//如果不存在
          let userData = new myUser({
            userName:reqData.userName,
            passWord:sign
          })

          userData.save()//保存用户名，注册成功
          .then(saveRes => {
            console.log('注册成功')
           
            res.json(successData)
          })
          .catch(err => {
            console.log(err)
            
            res.json(errData)
          })
        }
        else {
          console.log('用户名已经存在')
          res.json(errData)
        }
      })
      .catch(err => {
        console.log(err)

        res.json(errData)
      })
    }
    else {
      
      res.json(errData)
    }
    
})

//账户登入
router.get('/login',urlencodedParser,function(req,res,next){
    let reqData = req.query
    myUser.find({'userName':reqData.userName})
    .then(findres => {
      if(findres.length !=0){
        
        let ysign = crypto.createHash('md5').update(reqData.passWord, 'utf8').digest("hex");
        if (reqData.userName === findres[0].userName
        && ysign === findres[0].passWord) {
          req.session.isLogin = true
          req.session.user = reqData
          console.log('登入成功')
          console.log(req.session.isLogin)
          res.json(successData)
        }
        else {
          console.log('登入失败')
          res.json(errData)
        }
      }
      else {
        console.log('账户不存在')
        res.json(errData)
      }
    })
    .catch(finderr => {
      console.log(finderr)
      res.json(errData)
    })
})


//添加数据
router.post('/add',urlencodedParser,function(req,res,next){
  let addData = JSON.parse(req.body.data) 
  console.log(req.session.user)

  let list1 = new myList({
                  name:   addData.name,
                  address:addData.adress,
                  userName:req.session.user.userName
              })

  list1.save()
  .then(saveres => {
    console.log('存储成功')
    res.json(successData)
  })
  .catch(saveerr => {
    console.log('存储失败')
  })
  
})

//首页列表请求
router.get('/list',function(req,res,next){
  let listData = {}
  let list = [];
  let listDataEv = {}
  // req.session.user = reqData
  console.log(req.session.isLogin)
  if (req.session.isLogin == true){
    myList.find({'userName':req.session.user.userName})//搜索数据
    .then(resp => {
      
      resp.forEach((item,index) => {
        listDataEv = {
          name:item.name,
          address:item.address,
          date:item.date
        }
        list.push(listDataEv)
      });
      listData = {
        sc:0,
        list:list
      }
      res.json(listData)
    })
    .catch(err => {
      console.log('搜索失败')
    })
  }
  else {
    res.json(errData)
  }
})

module.exports = router;
