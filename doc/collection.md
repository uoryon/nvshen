####silencer

``
{
  uname:,
  password:,
  ch:{ //可以更改的內容
    nick,
    birthday,
    email,
    op
  },
  unch:{ //不可以更改的內容
    regtime
  },
  head
}
``
- 使用文件 models/user.js, routes/us.js, public/js/log.js


####girl
``
{
  uname:,
  head:,
  gname:,
  descri:,
  like:,
  plike:
}
``
- 每日爲plike+=0.01, like += plike^2,plike(not) = 1.02
- 使用文件 modles/nvshen.js, route/ns.js, public/js/girl.js

####speaktoher
``
{
  uname::,
  gname:,
  content:,
  date:
}
``

####gallery
``
{
  uname:,
  gname:,
  descri:,
  date:,
  picurl:
}
``
