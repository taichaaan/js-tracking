# js-hoverTracking


## Description
hoverしたら要素のところまで追跡するプラグインです。


## Class
### hoge
- is-move -- 動いているときにtrackingTargetに付与されるクラスです。
- is-initial -- is-moveではないときにtrackingTargetに付与されるクラスです。



## Demo
```
./test/
``` 
test ディレクトリをご確認ください。  


## Usage
```
new hoverTracking('nav',{
	currentClass : 'is-current',
	hoverSelector: a,
	type         : 'vertical',
	targetStyle  : true,
	trackingStyle: true,
});
```


## Option
| option | Type | Default | description |
| ---- | ---- | ---- | ---- |
| currentClass | string | 'is-current' | currentのhoverSelectorに付与されるクラスを指定してください。<br>hoverしていないときの初期要素に付与されます。 |
| hoverSelector | string | null | hoverする要素のセレクタを指定してください。<br>必ずtargetの子孫要素です。 |
| type | string | 'vertical' | 要素が縦並びか横並びかを指定してください。<br>horizontal or vertical |
| targetStyle | boolean | true | targetにJavaScriptでStyleを指定する場合はtrueを指定してください。<br>falseの場合は、CSSでStyleを指定してください。 |
| trackingStyle | boolean | true | trackingにJavaScriptでStyleを指定する場合はtrueを指定してください。<br>falseの場合は、CSSでStyleを指定してください。 |



## Method
| name  | description |
| ---- | ---- |
| addStyleVertical | typeがverticlaの時、trackingにactiveStyleを与える関数です。 |
| addStyleHorizontal | typeがhorizontalの時、trackingにactiveStyleを与える関数です。 |
| remove | 全てのイベントを削除する関数です。 |




## 開発環境

### node
v14.14.0


### gulp
v4.0.2
