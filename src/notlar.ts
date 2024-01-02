import { BehaviorSubject, Observable, Subject, filter, first, from, last, map, of, pluck, take, tap } from "rxjs";
//Observable, asenkron data akışını yönetmemizi sağlar.
const obs = new Observable<number>((subscriber)=>{ //data akışı içerisine bir bilgi ekledik.
    subscriber.next(1); //data akışı içerisine bir bilgi ekledik.
    subscriber.next(2);
    setTimeout(() => {
        subscriber.next(3)
    }, 1000);
    //subscriber.error("hata") 3 bilgisi ekrana yazdırılmaz. 1, 2 ve hata yazısı ekranda gösterilir.
    //subscriber.complete()  3 bilgisi ekrana yazdırılmaz. 1, 2 ve done yazısı ekranda gösterilir.
})

const observer={
    next:(value:any)=>console.log(value),
    error:(err:any)=>console.log(err),
    completed:()=>console.log("done")
}

obs.subscribe(data=>console.log("obs1: ",data))// 1 \n 2
obs.subscribe(data=>console.log("obs2: ",data))// 1 \n 2
//yukarıdaki kullanımda ekrana ilk olarak obs1 için 1 ve 2 değeri ardından obs2 için 1 ve 2 değeri, 1 saniye sonra obs1 ve 2 için 3 değer yazdılır.
//bunu sebebi çağırdığımız her obs.subscribenin ilk tanımladığımız obs nin bir kopyası olmasıdır. obs içerisine subscriber.next(Math.random()) dediğimizde obs1 ve obs2 için
//farklı random değerler ekrana yazdırılır


// obs.subscribe(observer) obs içerisindeki datayı observere aktardık. observer içerisindeki next bilgisi obs içerisinde 
//subscriber.next ile veri akışına eklenen bilgileri ekrana yazdırır.

//SUBJECT

const subject = new Subject<number>()

const sub={
    next:(value:any)=>console.log(value),
    error:(err:any)=>console.log(err),
    completed:()=>console.log("done")
}
subject.subscribe(sub)
subject.subscribe(sub)
//yukarıdaki kodda iki değer de ekrana aynı random değerleri yazdırır. subject, tek bir kanaldan multicast yayın yapmayı sağlayan bir observable yapıdır. subscribe olan tüm gözlemcilere aynı veriler aktarılır.
subject.next(1);
subject.next(2);
subject.next(Math.random());
//subscribe olan nesne, subscribe olmadan önce eklenen verileri göremez. veriler subscribe işleminden sonra eklenir

//RxJS OPERATÖRLERİ

from(["toyota","audi","bmw"])
    .subscribe(data=>console.log(data)); //diziyi absorvable yapıya dönüştürmek için kullanılır
of("mercedes","nissan","opel")
    .subscribe(data=>console.log(data))//parametre olarak gönderdiğimiz verileri observable yapıya çevirir

from([1,3,4,5,8,9,12,15,18,20])
    .pipe(
        //first(), ilk elemanı alır
        //last(), son elemanı alır
        //take(2), ilk 2 elemanı alır
        //filter(n=>n%2==0)çift sayıları alır
        //first(n=>n%2==0) //geriye dönen ilk çift sayıyı alır
        last(n=>n%11==0,2)//n%11==0 ifadesinden geri bir değer dönmezse, default olarak 2 değeri dönsün
    ).subscribe(data=>console.log(data))

from([
    {
        name:"Samsung S21",price:20000
    },
    {
        name:"Samsung S22",price:22000
    },
    {
        name:"Samsung S23",price:24000
    }
]).pipe(
    //pluck("name") gelen obje bilgisinin name bilgilerini alır.
    map(p=>p.name)//aynı işlevi görür
).subscribe(data=>console.log(data))



//BEHAVIOR SUBJECT

const behaviorSubject=new BehaviorSubject(-1)//başlangıç değeri zorunlu

behaviorSubject.next(2);

behaviorSubject.subscribe(data=>console.log(data))//akış içerisinde sub işleminden önce eklenen son veriyi (2) görür.

behaviorSubject.next(3);
behaviorSubject.next(4);

