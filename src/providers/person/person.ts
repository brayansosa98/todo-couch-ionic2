import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CouchbaseLite } from '@ionic-native/couchbase-lite';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class CouchbaseProvider {

  private static DATA_BASE = 'tapptusMobile';
  url: string;
  results: any;
  isInstantiated: boolean;

  constructor(private couchbase: CouchbaseLite, private _http: Http) {
    this.initMethod();
    if (!this.isInstantiated) {
      this.createDatabase().subscribe(params => {
        console.log(params);

        this.isInstantiated = true;
      }, error => {
        console.error(error);
      });
    }
  }


  initMethod() {
    this.couchbase.getURL().then((url) => {
      this.url = url;
    })
  }

  getUrl() {
    return this.url;
  }

  // DATABASES //
  createDatabase() {
    let url = this.getUrl();
    url = url + CouchbaseProvider.DATA_BASE;
    return this._http
      .put(url, null)
      .map(data => {
        this.results = data['results'];
        console.log("HOLA MUNDO")
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  deleteDatabase() {
    let url = this.getUrl();
    url = url + CouchbaseProvider.DATA_BASE;
    return this._http
      .delete(url)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  getAllDbs() {
    let url = this.getUrl();
    url = url + '_all_dbs';
    return this._http
      .get(url)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  // DOCUMENTS //
  getAllDocuments() {
    let url = this.getUrl();
    // include_docs=true will include a doc inside response, it is false by default
    url = url + CouchbaseProvider.DATA_BASE + '/_all_docs?include_docs=true';
    return this._http
      .get(url)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  createDocument(document) {
    let url = this.getUrl();
    url = url + CouchbaseProvider.DATA_BASE;
    return this._http
      .post(url, document)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  // document = {
  //   _id: 'You can either specify the document ID (must be string) else couchbase generates one for your doc',
  //   data: { name: 'sandman', age: 25, city: "pune" }
  // }
  // createDocument("justbe", document);
  // successful response
  // { "id": "string", "rev": "string", "ok": true }
  updateDocument(document) {
    let url = this.getUrl();
    url = url + CouchbaseProvider.DATA_BASE + '/' + document._id;
    return this._http
      .put(url, document)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }
  // for updation of document your document must contain most recent rev(revision) id.
  // for each updation of document new rev id is get generated
  // successful response
  // { "id": "string", "rev": "string(new revision id)", "ok": true }

  deleteDocument(document) {
    let url = this.getUrl();
    url = url + CouchbaseProvider.DATA_BASE + '/' + document._id + '?rev=' + document._rev;
    return this._http
      .delete(url)
      .map(data => { this.results = data['results'] })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
  }

}