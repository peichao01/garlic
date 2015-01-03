module.exports = function(ctx){
var __tplStr='var __str=\"\";\
__str+=\"<p>这个班级一共有 \";\
__str+=Object.keys(students).length;\
__str+=\" 个学生，分别是：</p>\\n\
<ul>\\n\
\";\
;(function(){\
var keys = Object.keys(students);\
var loop = {length: keys.length};\
for(var i = 0, len = keys.length; i<len; i++){\
loop.index0 = i;\
loop.index = i+1;\
loop.first = i === 0;\
loop.last = i === len-1;\
loop.revindex = len - i;\
loop.revindex0 = len - 1 - i;\
var key = keys[i];\
var val = students[key];\
var name = key;\
var student = val;\
__str+=\"\\n\
\";\
var nick = student.nick;\
__str+=\"\\n\
<li>\\n\
    \";\
__str+=loop.index;\
__str+=\".\\n\
    姓名：\";\
__str+=__g.getFilter(\"split\").call(__ctx, __g.getFilter(\"upper\").call(__ctx, name), \',\');\
__str+=\"，\\n\
    学号：\";\
__str+=__g.getFilter(\"toString\").call(__ctx, student.number);\
__str+=\"，\\n\
    昵称： \\"\";\
__str+=nick;\
__str+=\"\\",\\n\
    出生年月：\";\
__str+=__g.getFilter(\"formatTime\").call(__ctx, __g.getFilter(\"toPHPTS\").call(__ctx, student.birth));\
__str+=\"\\n\
</li>\\n\
\";\
}\
})();\
__str+=\"\\n\
</ul>\\n\
<p>今天是星期 \";\
if(today == 0){\
__str+=\"7\";\
}else{\
__str+=\"\";\
__str+=today;\
__str+=\"\";\
}\
__str+=\"</p>\\n\
<pre>\\n\
\\n\
    // this is the code.\\n\
    var name = code;\\n\
\\n\
\\n\
</pre>\";\
;return __str\
'
var fnBody = "";
for(var key in ctx){
if(ctx.hasOwnProperty(key)) fnBody += 'var ' + key + '=__ctx["'+key+'"];';
}
return new Function('__ctx', '__g',fnBody + __tplStr)(ctx, garlic.context)}