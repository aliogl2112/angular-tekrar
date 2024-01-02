"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
//Observable, asenkron data akışını yönetmemizi sağlar.
var obs = new rxjs_1.Observable(function (subscriber) {
    subscriber.next(1); //data akışı içerisine bir bilgi ekledik.
    subscriber.next(2);
    setTimeout(function () {
        subscriber.next(3);
    }, 1000);
    //subscriber.error("hata") 3 bilgisi ekrana yazdırılmaz. 1, 2 ve hata yazısı ekranda gösterilir.
    //subscriber.complete()  3 bilgisi ekrana yazdırılmaz. 1, 2 ve done yazısı ekranda gösterilir.
});
var observer = {
    next: function (value) { return console.log(value); },
    error: function (err) { return console.log(err); },
    completed: function () { return console.log("done"); }
};
obs.subscribe(function (data) { return console.log("obs1: ", data); }); // 1 \n 2
obs.subscribe(function (data) { return console.log("obs2: ", data); }); // 1 \n 2
//yukarıdaki kullanımda ekrana ilk olarak obs1 için 1 ve 2 değeri ardından obs2 için 1 ve 2 değeri, 1 saniye sonra obs1 ve 2 için 3 değer yazdılır.
//bunu sebebi çağırdığımız her obs.subscribenin ilk tanımladığımız obs nin bir kopyası olmasıdır. obs içerisine subscriber.next(Math.random()) dediğimizde obs1 ve obs2 için
//farklı random değerler ekrana yazdırılır
// obs.subscribe(observer) obs içerisindeki datayı observere aktardık. observer içerisindeki next bilgisi obs içerisinde 
//subscriber.next ile veri akışına eklenen bilgileri ekrana yazdırır.
//SUBJECT
var subject = new rxjs_1.Subject();
var sub = {
    next: function (value) { return console.log(value); },
    error: function (err) { return console.log(err); },
    completed: function () { return console.log("done"); }
};
subject.subscribe(sub);
subject.subscribe(sub);
//yukarıdaki kodda iki değer de ekrana aynı random değerleri yazdırır. subject, tek bir kanaldan multicast yayın yapmayı sağlayan bir observable yapıdır. subscribe olan tüm gözlemcilere aynı veriler aktarılır.
subject.next(1);
subject.next(2);
subject.next(Math.random());
//subscribe olan nesne, subscribe olmadan önce eklenen verileri göremez. veriler subscribe işleminden sonra eklenir
//RxJS OPERATÖRLERİ
(0, rxjs_1.from)(["toyota", "audi", "bmw"])
    .subscribe(function (data) { return console.log(data); }); //diziyi absorvable yapıya dönüştürmek için kullanılır
(0, rxjs_1.of)("mercedes", "nissan", "opel")
    .subscribe(function (data) { return console.log(data); }); //parametre olarak gönderdiğimiz verileri observable yapıya çevirir
(0, rxjs_1.from)([1, 3, 4, 5, 8, 9, 12, 15, 18, 20])
    .pipe(
//first(), ilk elemanı alır
//last(), son elemanı alır
//take(2), ilk 2 elemanı alır
//filter(n=>n%2==0)çift sayıları alır
//first(n=>n%2==0) //geriye dönen ilk çift sayıyı alır
(0, rxjs_1.last)(function (n) { return n % 11 == 0; }, 2) //n%11==0 ifadesinden geri bir değer dönmezse, default olarak 2 değeri dönsün
).subscribe(function (data) { return console.log(data); });
(0, rxjs_1.from)([
    {
        name: "Samsung S21", price: 20000
    },
    {
        name: "Samsung S22", price: 22000
    },
    {
        name: "Samsung S23", price: 24000
    }
]).pipe(
//pluck("name") gelen obje bilgisinin name bilgilerini alır.
(0, rxjs_1.map)(function (p) { return p.name; }) //aynı işlevi görür
).subscribe(function (data) { return console.log(data); });
//BEHAVIOR SUBJECT
var behaviorSubject = new rxjs_1.BehaviorSubject(-1); //başlangıç değeri zorunlu
behaviorSubject.next(2);
behaviorSubject.subscribe(function (data) { return console.log(data); }); //akış içerisinde sub işleminden önce eklenen son veriyi (2) görür.
behaviorSubject.next(3);
behaviorSubject.next(4);
