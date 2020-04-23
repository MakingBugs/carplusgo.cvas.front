import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';

/**
 * 表单检查
 */
const Check={
  /**非空验证 */
  required:{
    PCA:{required: true, message: '请选择数据！'},
    req:{required: true, message: '此项必填！'},
    select:{required: true, message: '请选择数据！', trigger: 'blur,change',type:'number'},
    text:{required: true, message: '此项不可为空！', trigger: 'blur,change'},
    number:{required: true, message: '此项不可为空！', trigger: 'blur,change',type:'number'},
    radio:{required:true, message: '至少选中一项！', trigger: 'change' }, //单选框
    multiple:{required: true, type: 'array', min: 1, message: '至少选中一项！', trigger: 'change'},//多选
    select1:{required: true, message: '请选择数据！', trigger: 'blur,change',type:'text'},//下拉框
    date1:{required: true, message: '日期不可为空！', type: 'date', trigger: 'change'},//日期
  },
  /**内容验证 */
  checkvalue:{
    number:{pattern:/^[0-9]*$/,message: '内容必须为数字！', trigger: 'blur,change'},
    mail:{type: 'email', message: '邮箱格式错误！', trigger: 'blur,change'},
    date:{type: 'date', message: '时间格式错误！', trigger: 'blur,change'},
    tel:{pattern:/^\d{3}-\d{8}|\d{4}-\d{7}$/,message:'格式错误！示例(0370-6666888)',trigger:'blur,change'},
    fax:{pattern:/^(\d{3,4}-)?\d{7,8}$/,message:'格式错误！示例(0370-6666888)',trigger:'blur,change'},
    zipcode:{pattern:/^[1-9]\d{5}(?!\d)$/,message:'邮政编码格式错误！',trigger:'blur,change'},
    mobiel:{pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'手机号码格式错误！',trigger:'blur,change'}
  }
}

/**表单验证-自定义提示内容 */
const NewCheck={
  /**非空验证 */
  required:{
    /**验证下拉框 */
    select(msg){
      return {required: true, message: msg}
    },
    /**一般Input验证 */
    req(msg){
      return {required: true, message: msg}
    },
    // PCA:{required: true, message: '请选择数据！'},
    // req:{required: true, message: '此项必填！'},
    // select:{required: true, message: '请选择数据！', trigger: 'blur,change',type:'number'},
    // text:{required: true, message: '此项不可为空！', trigger: 'blur,change'},
    // number:{required: true, message: '此项不可为空！', trigger: 'blur,change',type:'number'},
    // radio:{required:true, message: '至少选中一项！', trigger: 'change' }, //单选框
    // multiple:{required: true, type: 'array', min: 1, message: '至少选中一项！', trigger: 'change'},//多选
    // select1:{required: true, message: '请选择数据！', trigger: 'blur,change',type:'text'},//下拉框
    // date1:{required: true, message: '日期不可为空！', type: 'date', trigger: 'change'},//日期
  },
  /**内容验证 */
  checkvalue:{
    // number:{pattern:/^[0-9]*$/,message: '内容必须为数字！', trigger: 'blur,change'},
    // mail:{type: 'email', message: '邮箱格式错误！', trigger: 'blur,change'},
    // date:{type: 'date', message: '时间格式错误！', trigger: 'blur,change'},
    // tel:{pattern:/^\d{3}-\d{8}|\d{4}-\d{7}$/,message:'格式错误！示例(0370-6666888)',trigger:'blur,change'},
    // fax:{pattern:/^(\d{3,4}-)?\d{7,8}$/,message:'格式错误！示例(0370-6666888)',trigger:'blur,change'},
    // zipcode:{pattern:/^[1-9]\d{5}(?!\d)$/,message:'邮政编码格式错误！',trigger:'blur,change'},
    // mobiel:{pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'手机号码格式错误！',trigger:'blur,change'}
  }
}

/**
 * map{
    value: 'department_id',
    label: 'department_name',
    children: 'child_departments'
  }
 * 数据转换
 * tree 待转换的 tree，
 * map  键值对映射，
 * isloading 是否需要异步加载，
 * return 转换后的 tree
 */
function ConvertTree (tree, map,isloading) {
  const result = []

  // 遍历 tree
  tree.map((item) => {
    if(item[map.label]!=""){
      // 读取 map 的键值映射
      const value = item[ map.value ]
      const label = item[ map.label ]
      let loading = false
      let children:any[]
      if(item[ map.children ]==undefined){
        children=[]
      }else{
        children=item[ map.children ]
      }
      if(isloading==1){
        result.push({
          value,
          label,
          children,
          loading
        })
      }else{
        result.push({
          value,
          label,
          children
        })
      }
        
        // 如果有子节点，递归
        // if (children) {
        //     children = ConvertTree(children, map)
        // }

    }
  })
  return result
}
/**数组、对象的深拷贝 */
function DeepClone<T>(value:T){
  let obj:T
  obj=JSON.parse(JSON.stringify(value))
  return obj
}

/**金额过滤器(,分隔) */
function MoneyFilter(oldm:number){
  let newm:string = `${oldm}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return newm
}

//时间格式化过滤器 data时间，fmt要转的格式（yyyy-MM-dd hh:mm:ss）
function FormatDate(date, fmt) {
  if (typeof date == 'string') {
    return date;
  }

  if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

  if (!date || date == null) return null;
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export default {Check,ConvertTree,DeepClone,MoneyFilter,NewCheck,FormatDate}
