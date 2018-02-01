# PerformanceTest
---

## 1.Setup

##### 1. Create mysql table.

* execute **mysql/create_performance_test_tabel.sql** to setup mysql table.

##### 2. Setup server.

* run `node server/index.js`, please run `npm install` before that.
* the mysql config file is **config.json**.
* the server port is **30000**.

##### 3. Setup web server.

* run `node echarts/index.js`, please run `npm install` before that.
* the server port is **30001**.
* the two server and mysql above should setup in one physical server.

##### 4. Check

* open url `http://<ip>:30001`, you can see `no data for now` if mysql has no data.

## 2.Test

##### 1.Open cocos creator project.

##### 2.Enter **Serial Number(SN)**, and click **autoTest**.

*  the same day serial number can not be repeated.

##### 3.Support OS & Browser.

* Mac Chrome.
* iOS Safari.
* iOS Chrome.
* Android Chrome.
* Android QQ Browser.

## 3. Add new test cases

you can add a new test case just by follow steps:

* add the test case scene as usual.
* add the test case infomation to config.TEST_CASE in the `assets/scripts/utils/config.js`.

