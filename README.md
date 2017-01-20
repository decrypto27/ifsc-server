# IFSC Server

It exposes APIs for fetching specific banking related information associated with a particular IFSC Code.
A cron is also included that syncs the data with rbi in case there are any changes.

## Getting Started

These instructions will show how to service the given APIs.
If you want to run the server on local system , first run script.js and then dbPopulator.js
to construct the database (they will scrape the RBI webpages and populate the db).

### Usage
If you just want to run it onto your local machine, just clone the project.
The syncing script is included as script.js.

##APIs

The project is currently hosted on **http://www.paywithupi.in**

For fetching all the details corresponding to a given ifsc code, just do :
```
curl -X GET  "http://www.paywithupi.in/HDFC0000459"
```

The result will be displayed as :

```
{
  "status": "SUCCESS",
  "info": {
    "ifsc": "HDFC0000459",
    "name": "HDFC Bank Ltd",
    "address": "MUNICIPAL NO. 3641/41,AGRA CHOWK , G T ROAD,PALWAL.PALWAL,HARYANA - 121102",
    "micr": "110240069",
    "city": "PALWAL",
    "district": "FARIDABAD",
    "state": "HARYANA"
  }
}
```
For fetching the address corresponding to a given ifsc code, just do :
```
curl -X GET  "http://www.paywithupi.in/address/HDFC0000459"
```

The result will be displayed as :

```
{
  "status": "SUCCESS",
  "info": {
    "address": "MUNICIPAL NO. 3641/41,AGRA CHOWK , G T ROAD,PALWAL.PALWALHARYANA121102"
  }
}
```
For fetching the micr corresponding to a given ifsc code, just do :
```
curl -X GET  "http://www.paywithupi.in/micr/HDFC0000459"
```

The result will be displayed as :

```
{
  "status": "SUCCESS",
  "info": {
    "micr": "110240069"
  }
}
```
In case the ifsc is invalid in any of the given requests, like
```
curl -X GET  "http://www.paywithupi.in/Something-wrong-here"
```

The result will be displayed as :

```
{
  "status": "FAILURE",
  "message": "No such bank was found.Please try again with some other ifsc."
}
```


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Vijay Kumar Attri** - [decrypto27](https://github.com/decrypto27)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

