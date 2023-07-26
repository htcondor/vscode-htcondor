    match_list_length = <integer value>

Defaults to the value zero (0). When **match_list_length** is defined
with an integer value greater than zero (0), attributes are inserted
into the job ClassAd. The maximum number of attributes defined is given
by the integer value. The job ClassAds introduced are given as

<div>

<div>

    LastMatchName0 = "most-recent-Name"
    LastMatchName1 = "next-most-recent-Name"

</div>

</div>

The value for each introduced ClassAd is given by the value of the
`Name` attribute from the machine ClassAd of a previous execution
(match). As a job is matched, the definitions for these attributes will
roll, with LastMatchName1 becoming LastMatchName2, LastMatchName0
becoming LastMatchName1, and LastMatchName0 being set by the most recent
value of the `Name` attribute.

An intended use of these job attributes is in the requirements
expression. The requirements can allow a job to prefer a match with
either the same or a different resource than a previous match.
