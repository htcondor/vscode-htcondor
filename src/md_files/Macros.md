    Macros

Parameterless macros in the form of
`$(macro_name:default`` ``initial`` ``value)` may be used anywhere in
HTCondor submit description files to provide textual substitution at
submit time. Macros can be defined by lines in the form of

<div>

<div>

    <macro_name> = <string>

</div>

</div>

Several pre-defined macros are supplied by the submit description file
parser. The `$(Cluster)` or `$(ClusterId)` macro supplies the value of
the `ClusterId` job ClassAd attribute, and the `$(Process)` or
`$(ProcId)` macro supplies the value of the `ProcId` job ClassAd
attribute. The `$(JobId)` macro supplies the full job id. It is
equivalent to `$(ClusterId).$(ProcId)`. These macros are intended to aid
in the specification of input/output files, arguments, etc., for
clusters with lots of jobs, and/or could be used to supply an HTCondor
process with its own cluster and process numbers on the command line.

The `$(Node)` macro is defined for parallel universe jobs, and is
especially relevant for MPI applications. It is a unique value assigned
for the duration of the job that essentially identifies the machine
(slot) on which a program is executing. Values assigned start at 0 and
increase monotonically. The values are assigned as the parallel job is
about to start.

Recursive definition of macros is permitted. An example of a
construction that works is the following:

<div>

<div>

    foo = bar
    foo =  snap $(foo)

</div>

</div>

As a result, `foo`` ``=`` ``snap`` ``bar`.

Note that both left- and right- recursion works, so

<div>

<div>

    foo = bar
    foo =  $(foo) snap

</div>

</div>

has as its result `foo`` ``=`` ``bar`` ``snap`.

The construction

<div>

<div>

    foo = $(foo) bar

</div>

</div>

by itself will not work, as it does not have an initial base case.
Mutually recursive constructions such as:

<div>

<div>

    B = bar
    C = $(B)
    B = $(C) boo

</div>

</div>

will not work, and will fill memory with expansions.

A default value may be specified, for use if the macro has no
definition. Consider the example

<div>

<div>

    D = $(E:24)

</div>

</div>

Where `E` is not defined within the submit description file, the default
value 24 is used, resulting in

<div>

<div>

    D = 24

</div>

</div>

This is of limited value, as the scope of macro substitution is the
submit description file. Thus, either the macro is or is not defined
within the submit description file. If the macro is defined, then the
default value is useless. If the macro is not defined, then there is no
point in using it in a submit command.

To use the dollar sign character (\$) as a literal, without macro
expansion, use

<div>

<div>

    $(DOLLAR)

</div>

</div>

In addition to the normal macro, there is also a special kind of macro
called a substitution macro that allows the substitution of a machine
ClassAd attribute value defined on the resource machine itself (gotten
after a match to the machine has been made) into specific commands
within the submit description file. The substitution macro is of the
form:

<div>

<div>

    $$(attribute)

</div>

</div>

As this form of the substitution macro is only evaluated within the
context of the machine ClassAd, use of a scope resolution prefix
`TARGET.` or `MY.` is not allowed.

A common use of this form of the substitution macro is for the
heterogeneous submission of an executable:

<div>

<div>

    executable = povray.$$(OpSys).$$(Arch)

</div>

</div>

Values for the `OpSys` and `Arch` attributes are substituted at match
time for any given resource. This example allows HTCondor to
automatically choose the correct executable for the matched machine.

An extension to the syntax of the substitution macro provides an
alternative string to use if the machine attribute within the
substitution macro is undefined. The syntax appears as:

<div>

<div>

    $$(attribute:string_if_attribute_undefined)

</div>

</div>

An example using this extended syntax provides a path name to a required
input file. Since the file can be placed in different locations on
different machines, the file's path name is given as an argument to the
program.

<div>

<div>

    arguments = $$(input_file_path:/usr/foo)

</div>

</div>

On the machine, if the attribute `input_file_path` is not defined, then
the path `/usr/foo` is used instead.

As a special case that only works within the submit file *environment*
command, the string \$\$(CondorScratchDir) is expanded to the value of
the job's scratch directory. This does not work for scheduler universe
or grid universe jobs.

For example, to set PYTHONPATH to a subdirectory of the job scratch dir,
one could set

<div>

<div>

    environment = PYTHONPATH=$$(CondorScratchDir)/some/directory

</div>

</div>

A further extension to the syntax of the substitution macro allows the
evaluation of a ClassAd expression to define the value. In this form,
the expression may refer to machine attributes by prefacing them with
the `TARGET.` scope resolution prefix. To place a ClassAd expression
into the substitution macro, square brackets are added to delimit the
expression. The syntax appears as:

<div>

<div>

    $$([ClassAd expression])

</div>

</div>

An example of a job that uses this syntax may be one that wants to know
how much memory it can use. The application cannot detect this itself,
as it would potentially use all of the memory on a multi-slot machine.
So the job determines the memory per slot, reducing it by 10% to account
for miscellaneous overhead, and passes this as a command line argument
to the application. In the submit description file will be

<div>

<div>

    arguments = --memory $$([TARGET.Memory * 0.9])

</div>

</div>

To insert two dollar sign characters (\$\$) as literals into a ClassAd
string, use

<div>

<div>

    $$(DOLLARDOLLAR)

</div>

</div>

The environment macro, \$ENV, allows the evaluation of an environment
variable to be used in setting a submit description file command. The
syntax used is

<div>

<div>

    $ENV(variable)

</div>

</div>

An example submit description file command that uses this functionality
evaluates the submitter's home directory in order to set the path and
file name of a log file:

<div>

<div>

    log = $ENV(HOME)/jobs/logfile

</div>

</div>

The environment variable is evaluated when the submit description file
is processed.

The \$RANDOM_CHOICE macro allows a random choice to be made from a given
list of parameters at submission time. For an expression, if some
randomness needs to be generated, the macro may appear as

<div>

<div>

    $RANDOM_CHOICE(0,1,2,3,4,5,6)

</div>

</div>

When evaluated, one of the parameters values will be chosen.
