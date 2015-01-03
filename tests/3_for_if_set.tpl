<p>这个班级一共有 {{ Object.keys(students).length }} 个学生，分别是：</p>
<ul>
{% for student, name in students %}
{% set nick = student.nick %}
<li>
    {{loop.index}}.
    姓名：{{name | upper | split(',') }}，
    学号：{{student.number | toString}}，
    昵称： "{{nick}}",
    出生年月：{{ student.birth | toPHPTS | formatTime }}
</li>
{% endfor %}
</ul>
<p>今天是星期 {% if today == 0 %}7{% else %}{{ today }}{% endif %}</p>
<pre>

    // this is the code.
    var name = code;


</pre>