# Change Log

All notable changes to the "htc" extension will be documented in this file.

Uses [Keep a Changelog](http://keepachangelog.com/) to structure this file.

## [0.5.0] - 2023-09-12

### Added

- Htcondor jobs explorer view

## [1.0.1] - 2023-09-20

### Added

- Htcondor jobs explorer view
- Htcondor job logs view

## [1.0.2] - 2023-010-08

### Added

- syntax highlighting for queue in, queue from, and queue matching, i.e.

```htcondor
queue 1 in A, B, C
queue from seq 7 9
queue filename matching files *.dat
```

- language-configuation.json file to enable editor commenting keyboard shortcuts

### Fixed

- syntax highlighting for = before integer and booleans