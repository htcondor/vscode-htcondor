    queue [<int expr> ]

Places zero or more copies of the job into the HTCondor queue.

    queue

\[**\<int expr\>** \] \[**\<varname\>** \] **in** \[**slice** \]
**\<list of items\>** Places zero or more copies of the job in the queue
based on items in a **\<list of items\>**

    queue

\[**\<int expr\>** \] \[**\<varname\>** \] **matching** \[**files \|
dirs** \] \[**slice** \] **\<list of items with file globbing\>**\]
Places zero or more copies of the job in the queue based on files that
match a **\<list of items with file globbing\>**

    queue

\[**\<int expr\>** \] \[**\<list of varnames\>** \] **from** \[**slice**
\] **\<file name\> \| \<list of items\>**\] Places zero or more copies
of the job in the queue based on lines from the submit file or from
**\<file name\>**

The optional argument *\<int expr\>* specifies how many times to repeat
the job submission for a given set of arguments. It may be an integer or
an expression that evaluates to an integer, and it defaults to 1. All
but the first form of this command are various ways of specifying a list
of items. When these forms are used *\<int expr\>* jobs will be queued
for each item in the list. The *in*, *matching* and *from* keyword
indicates how the list will be specified.

-   *in* The list of items is an explicit comma and/or space separated
    **\<list of items\>**. If the **\<list of items\>** begins with an
    open paren, and the close paren is not on the same line as the open,
    then the list continues until a line that begins with a close paren
    is read from the submit file.

-   *matching* Each item in the **\<list of items with file globbing\>**
    will be matched against the names of files and directories relative
    to the current directory, the set of matching names is the resulting
    list of items.

    -   *files* Only filenames will matched.

    -   *dirs* Only directory names will be matched.

-   *from* **\<file name\> \| \<list of items\>** Each line from
    **\<file name\>** or **\<list of items\>** is a single item, this
    allows for multiple variables to be set for each item. Lines from
    **\<file name\>** or **\<list of items\>** will be split on comma
    and/or space until there are values for each of the variables
    specified in **\<list of varnames\>**. The last variable will
    contain the remainder of the line. When the **\<list of items\>**
    form is used, the list continues until the first line that begins
    with a close paren, and lines beginning with pound sign ('#') will
    be skipped. When using the **\<file name\>** form, if the **\<file
    name\>** ends with \|, then it will be executed as a script whatever
    the script writes to `stdout` will be the list of items.

The optional argument *\<varname\>* or *\<list of varnames\>* is the
name or names of of variables that will be set to the value of the
current item when queuing the job. If no *\<varname\>* is specified the
variable ITEM will be used. Leading and trailing whitespace be trimmed.
The optional argument *\<slice\>* is a python style slice selecting only
some of the items in the list of items. Negative step values are not
supported.

A submit file may contain more than one **queue** statement, and if
desired, any commands may be placed between subsequent **queue**
commands, such as new **input** , **output** , **error** ,
**initialdir** , or **arguments** commands. This is handy when
submitting multiple runs into one cluster with one submit description
file.
