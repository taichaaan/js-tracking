# js-tracking


## Description
hoverまたはclickしたら要素のところまで追跡するプラグインです。  
  
全体を囲む要素を「tracking」  
実際に追跡する要素を「stalker」とします。


## Class
### hoge
- is-move -- 動いているときにtrackingTargetに付与されるクラスです。
- is-initial -- 初期値の場所にいる時、trackingTargetに付与されるクラスです。



## Demo
```
./test/
``` 
test ディレクトリをご確認ください。  


## Usage
```JavaScript
new tracking('.js-tracking',{
	type                 : 'hover', // hover or click
	hoverSelector        : 'a:not(.js-tracking__not)',
	objectiveSelector    : null,
	direction            : 'vertical', // horizontal or vertical
	currentClass         : 'is-current',
	mouseleaveCurrentPosition: false,
	trackingStyle        : true,
	stalkerStyle         : true,
	stalkerClass         : ['js-tracking__stalker'],
	resize               : true,
});
```


## Option
| option | Type | Default | description |
| ---- | ---- | ---- | ---- |
| type | string | 'hover' | ・hover<br>・click |
| hoverSelector | string | null | hoverやclickする要素のセレクタを指定してください。<br>必ずtargetの子孫要素です。 |
| objectiveSelector | string | null | stalkerの目的となる要素を指定してください。<br>必ずtargetの子孫要素です。 |
| direction | string | 'vertical' | 要素が縦並びか横並びかを指定してください。<br>horizontal or vertical |
| currentClass | string | 'is-current' | currentのhoverSelectorに付与されるクラスを指定してください。<br>hoverしていないときの初期要素に付与されます。 |
| mouseleaveCurrentPosition | boolean | false | マウスが外れた時、currentの位置に戻るか否かを指定してください。 |
| trackingStyle | boolean | true | trackingにJavaScriptでStyleを指定する場合はtrueを指定してください。<br>falseの場合は、CSSでStyleを指定してください。 |
| stalkerStyle | boolean | true | stalkerにJavaScriptでStyleを指定する場合はtrueを指定してください。<br>falseの場合は、CSSでStyleを指定してください。 |
| stalkerClass | array | null | stalkerに付与するクラスを配列で指定してください。 |
| resize | boolean | true | リサイズでstalkerの位置を変更する場合はtrueを指定してください。 |



## Method
| name  | description |
| ---- | ---- |
| remove | 全てのイベントを削除する関数です。 |




## 開発環境

### node
v14.14.0


### gulp
v4.0.2
