[![Build Status](https://travis-ci.org/davidmerrick/trump-report.svg?branch=master)](https://travis-ci.org/davidmerrick/trump-report)

# Trump Report

Hobby project I wrote to do some AI analysis of Trump tweets. Also an experiment in building a serverless web app.

* Live demo at [https://tr.david-merrick.com/](https://tr.david-merrick.com/)
* Completely serverless architecture; static assets are hosted on S3 and Lambda is used to fetch data
* Uses IBM Watson's Cognitive API for analysis

![](img/screenshot.jpg)

## Architecture

### Frontend

The frontend is primarily built with React, Redux, Redux-Saga, and React-Bootstrap, in ES2015 syntax. WebPack and Babel are used for transpiling.

### Backend

On the backend, [this Lambda](https://github.com/davidmerrick/lambda-tweets-sns) runs on a 30-minute timer. It fetches Trump's most recent Tweets, filters out retweets, then pushes them to [SNS](https://aws.amazon.com/sns/). [This Lambda](https://github.com/davidmerrick/lambda-classify-tweets-s3) is then triggered by the SNS notification. It checks if there are any new Tweets, and, if there are, runs them through IBM Watson's Natural Language Classifier and Tone Analyzer APIs. It then stores the result in JSON in S3. For the "latest news" widget, a [separate Lambda function](https://github.com/davidmerrick/lambda-get-news) is fronted by AWS API Gateway and is used to fetch items from [News API](https://newsapi.org/).

## Reference

* [Watson API docs](https://www.ibm.com/watson/developercloud/doc/index.html)
* [Twitter API docs](https://dev.twitter.com/rest/public)
* [News API docs](https://newsapi.org/#sources)
