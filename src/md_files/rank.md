    rank = <ClassAd Float Expression>

A ClassAd Floating-Point expression that states how to rank machines
which have already met the requirements expression. Essentially, rank
expresses preference. A higher numeric value equals better rank.
HTCondor will give the job the machine with the highest rank. For
example,

<div>

<div>

    request_memory = max({60, Target.TotalSlotMemory})
    rank = Memory

</div>

</div>

asks HTCondor to find all available machines with more than 60 megabytes
of memory and give to the job the machine with the most amount of
memory. The HTCondor User's Manual contains complete information on the
syntax and available attributes that can be used in the ClassAd
expression.
