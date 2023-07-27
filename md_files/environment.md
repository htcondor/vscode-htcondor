    environment = <parameter_list>

List of environment variables.

There are two different formats for specifying the environment
variables: the old format and the new format. The old format is retained
for backward-compatibility. It suffers from a platform-dependent syntax
and the inability to insert some special characters into the
environment.

The new syntax for specifying environment values:

1.  Put double quote marks around the entire argument string. This
    distinguishes the new syntax from the old. The old syntax does not
    have double quote marks around it. Any literal double quote marks
    within the string must be escaped by repeating the double quote
    mark.

2.  Each environment entry has the form

    <div>

    <div>

        <name>=<value>

    </div>

    </div>

3.  Use white space (space or tab characters) to separate environment
    entries.

4.  To put any white space in an environment entry, surround the space
    and as much of the surrounding entry as desired with single quote
    marks.

5.  To insert a literal single quote mark, repeat the single quote mark
    anywhere inside of a section surrounded by single quote marks.

Example:

<div>

<div>

    environment = "one=1 two=""2"" three='spacey ''quoted'' value'"

</div>

</div>

Produces the following environment entries:

<div>

<div>

    one=1
    two="2"
    three=spacey 'quoted' value

</div>

</div>

Under the old syntax, there are no double quote marks surrounding the
environment specification. Each environment entry remains of the form

<div>

<div>

    <name>=<value>

</div>

</div>

Under Unix, list multiple environment entries by separating them with a
semicolon (;). Under Windows, separate multiple entries with a vertical
bar (\|). There is no way to insert a literal semicolon under Unix or a
literal vertical bar under Windows. Note that spaces are accepted, but
rarely desired, characters within parameter names and values, because
they are treated as literal characters, not separators or ignored white
space. Place spaces within the parameter list only if required.

A Unix example:

<div>

<div>

    environment = one=1;two=2;three="quotes have no 'special' meaning"

</div>

</div>

This produces the following:

<div>

<div>

    one=1
    two=2
    three="quotes have no 'special' meaning"

</div>

</div>

If the environment is set with the **environment** command and
**getenv** is also set, values specified with **environment** override
values in the submitter's environment (regardless of the order of the
**environment** and **getenv** commands).
