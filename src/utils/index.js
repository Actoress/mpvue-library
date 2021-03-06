// 工具函数库
import config from './config'

// http get工具函数 获取知晓云数据数据
export function getData (TableID,remoteQueryData,compare,localQueryData,limit,offset,orderBy) {
  return new Promise((resolve, reject) => {
    let Datas = new wx.BaaS.TableObject(TableID)  //实例化对应 tableID 的数据表对象
    let query = new wx.BaaS.Query();              //新建查询对象
        query.compare(remoteQueryData,compare,localQueryData) //设置查询条件
        if(limit !== undefined && offset !== undefined && orderBy !== undefined) {
          Datas.setQuery(query).limit(limit).offset(offset).orderBy(orderBy).find()
            .then( res => {
              resolve(res.data.objects)
            },
            err => {
              console.log(err)
              reject(err)
            }
          )
        }
        else if (limit !== undefined && orderBy !== undefined) {
          Datas.setQuery(query).limit(limit).orderBy(orderBy).find()
          .then( res => {
            resolve(res.data.objects)
           },
            err => {
             console.log(err)
             reject(err)
           }
         )
        } else {
          Datas.setQuery(query).find()
          .then( res => {
            console.log(res)
            resolve(res.data.objects)
          },
          err => {
            console.log(err)
            reject(err)
          }
        )
      }
    }
  )
}

// http getStringData工具函数 获取知晓云数据数据  正则查询
export function getStringData (TableID,remoteQueryData,localQueryData) {
  return new Promise((resolve, reject) => {
    let Datas = new wx.BaaS.TableObject(TableID)  //实例化对应 tableID 的数据表对象
    let query = new wx.BaaS.Query();              //新建查询对象
    const regExp = new RegExp(`${localQueryData}`, 'i')
    query.matches(remoteQueryData, regExp) //设置查询条件
        Datas.setQuery(query).find()
        .then( res => {
          resolve(res.data.objects)
        },
        err => {
          console.log(err)
          reject(err)
        }
       )
  })
}

// http add工具函数 添加数据
export function addData (TableID,dataInfo){
  return new Promise((resolve,reject) => {
    let Datas = new wx.BaaS.TableObject(TableID)  //实例化对应 tableID 的数据表对象
    let data = Datas.create()
        data.set(dataInfo).save().then(res => {
          if(dataInfo.title) {
            showModal("成功",`${dataInfo.title}添加成功`)
            resolve(res)
          }
          if(dataInfo.comment) {
            showModal("成功",'评论发表成功')
            resolve(res)
          } else {
            resolve(res)
          }
        }, err => {
         console.log(err)
        }
      )
   }
 )
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
