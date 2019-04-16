# MillionBinaries

Project takes a million of binaries from [random.org API](https://www.random.org/clients/http/), counts occurrence of all sequences of 1, 2 and 3 binaries, and then shows its entry percentage in HTML format.
API allows about two requests of one million binaries from one IP per day, so if daily limit is exhausted, project takes binaries from local file. It's not truly random, but it contains data of one request from API and still provides the necessary data for project to work. 

### Setup

Clone project via

`git clone https://github.com/asasada/MillionBinaries.git`

and run locally.

### How to interact

After running project returns a link to localhost. After clicking on it you will see the counted occurrence of bits.
