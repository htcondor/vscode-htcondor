    arguments = <argument_list>

List of arguments to be supplied to the executable as part of the
command line.

In the **java** universe, the first argument must be the name of the
class containing `main`.

There are two permissible formats for specifying arguments, identified
as the old syntax and the new syntax. The old syntax supports white
space characters within arguments only in special circumstances; when
used, the command line arguments are represented in the job ClassAd
attribute `Args`. The new syntax supports uniform quoting of white space
characters within arguments; when used, the command line arguments are
represented in the job ClassAd attribute `Arguments`.

**Old Syntax**

In the old syntax, individual command line arguments are delimited
(separated) by space characters. To allow a double quote mark in an
argument, it is escaped with a backslash; that is, the two character
sequence \\" becomes a single double quote mark within an argument.

Further interpretation of the argument string differs depending on the
operating system. On Windows, the entire argument string is passed
verbatim (other than the backslash in front of double quote marks) to
the Windows application. Most Windows applications will allow spaces
within an argument value by surrounding the argument with double quotes
marks. In all other cases, there is no further interpretation of the
arguments.

Example:

<div>

<div>

    arguments = one \"two\" 'three'

</div>

</div>

Produces in Unix vanilla universe:

<div>

<div>

    argument 1: one
    argument 2: "two"
    argument 3: 'three'

</div>

</div>

**New Syntax**

Here are the rules for using the new syntax:

1.  The entire string representing the command line arguments is
    surrounded by double quote marks. This permits the white space
    characters of spaces and tabs to potentially be embedded within a
    single argument. Putting the double quote mark within the arguments
    is accomplished by escaping it with another double quote mark.

2.  The white space characters of spaces or tabs delimit arguments.

3.  To embed white space characters of spaces or tabs within a single
    argument, surround the entire argument with single quote marks.

4.  To insert a literal single quote mark, escape it within an argument
    already delimited by single quote marks by adding another single
    quote mark.

Example:

<div>

<div>

    arguments = "3 simple arguments"

</div>

</div>

Produces:

<div>

<div>

    argument 1: 3
    argument 2: simple
    argument 3: arguments

</div>

</div>

Another example:

<div>

<div>

    arguments = "one 'two with spaces' 3"

</div>

</div>

Produces:

<div>

<div>

    argument 1: one
    argument 2: two with spaces
    argument 3: 3

</div>

</div>

And yet another example:

<div>

<div>

    arguments = "one ""two"" 'spacey ''quoted'' argument'"

</div>

</div>

Produces:

<div>

<div>

    argument 1: one
    argument 2: "two"
    argument 3: spacey 'quoted' argument

</div>

</div>

Notice that in the new syntax, the backslash has no special meaning.
This is for the convenience of Windows users.
