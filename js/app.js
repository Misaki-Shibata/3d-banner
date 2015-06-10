var camera, scene, renderer;
var controls;
var object;
var dice;
var iii=1.0;

init();// 初期化
animate();// アニメーション開始

for(i=1; i< 10; i++){
  setTimeout(function(){$("#a").trigger("click");}, 1000*i);
  setTimeout(function(){$("#b").trigger("click");}, 2000*i);
  setTimeout(function(){$("#c").trigger("click");}, 3000*i);
  setTimeout(function(){$("#d").trigger("click");}, 4000*i);
  setTimeout(function(){$("#e").trigger("click");}, 5000*i);
}


function init() {

    // シーンを作る
    scene = new THREE.Scene();

    // カメラ設定
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;
    // camera.position.z = 210;
    // // オブジェクト（うぇぶ屋ロゴ）
    // object = new THREE.CSS3DObject(document.getElementById('webya'));
    // object2 = new THREE.CSS3DObject(document.getElementById('webya2'));
    //
    // // オブジェクトをシーンに追加
    // scene.add(object);
    // scene.add(object2);


    var el, info, img, face, boxInfo;
    var cubeSizeH  = 50;
    var cubeSizeW  = 320;
    boxInfo = [
       {
           url: 'bannerLR.png',
           //この面の位置
           position: [ -cubeSizeW, 0, 0 ],
           //この面の回転
           rotation: [ 0, Math.PI / 2, 0 ]
       },
       {
           url: 'bannerLR.png',
           position: [ cubeSizeW, 0, 0 ],
           rotation: [ 0, -Math.PI / 2, 0 ]
       },
       {// fixed
           url: 'banner3.png',
           position: [ 0,  cubeSizeH, 0 ],
           rotation: [ (Math.PI / 2), Math.PI , Math.PI ]
       },
       {// fixed
           url: 'banner4.png',
           position: [ 0, -cubeSizeH, 0 ],
           rotation: [ -(Math.PI / 2), Math.PI , Math.PI ]
       },
       {// fixed
           url: 'banner1.png',
           position: [ 0, 0,  cubeSizeH ],
           rotation: [ 0, Math.PI * 2, 0 ]
       },
       {// fixed
           url: 'banner2.png',
           position: [ 0, 0, -cubeSizeH ],
           rotation: [ -(Math.PI), Math.PI * 2, Math.PI * 2 ]
       }
    ];

    //div要素を生成
    el = document.createElement('div');
    //指定されたキューブのサイズに幅と高さを設定
    el.style.width  = cubeSizeW * 2 + 'px';
    el.style.height = cubeSizeH * 2 + 'px';

    //生成したdiv要素をThree.jsのオブジェクトと関連付ける
    //diceはサイコロの本体用の空のオブジェクト
    dice = new THREE.CSS3DObject(el);
    //サイコロの6面分を生成
      for (var i = 0; i < boxInfo.length; i++) {
          info = boxInfo[i];

          //テクスチャとして使うimg要素を生成
          img = document.createElement('img');
          //
          // //キューブのサイズに画像サイズを変更
          img.width = cubeSizeW * 2;
          //
          // //指定されたテクスチャ用画像を読み込む
          img.src = info.url;
          //
          // //生成したimg要素をThree.jsのオブジェクトと関連付け
          face = new THREE.CSS3DObject(img);

          //生成したオブジェクトを指定の位置に移動・回転
          face.position.fromArray(info.position);
          // console.log(info.url)
          // console.log(info.rotation)
          face.rotation.fromArray(info.rotation);

          //dice本体に面を追加
          dice.add(face);
      }
    // scene.add(dice);


    scene.add(dice);
    //正面マテリアルの生成
    //  var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    //
    // //側面マテリアルの生成
    //  var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    //  var materialArray = [ materialFront, materialSide ];
    //
    // //テキスト
    // var textGeom = new THREE.TextGeometry( "Three.js!",{
    //         size: 30, height: 4, curveSegments: 3,
    //         font: "helvetiker", weight: "normal", style: "normal",
    //         bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
    //         material: 0, extrudeMaterial: 1
    // });
    //
    // var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    // var textMesh = new THREE.Mesh(textGeom, textMaterial );
    //
    // //シーンオブジェクトに追加
    // scene.add(textMesh);


    // CSS3Dレンダラー
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 描画領域
    renderer.domElement.style.position = 'absolute'; // スタイル設定 {position:absolute}
    document.getElementById('container').appendChild(renderer.domElement); // 描画領域を#containerにappend

    // カメラコントローラー
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5; // 感度設定
    controls.addEventListener('change', render); // 値が変わった（マウスで何か位置が変更された）ときに render() を呼び出す


    var target0 = new THREE.Object3D();
    target0.position.y = 0;
    target0.rotation.x = 0; // -> 90度

    // 座標＆回転設定 A
    var targetA = new THREE.Object3D();
    targetA.position.y = 0;
    targetA.rotation.x = -(Math.PI / 2); // -> 90度


    // 座標＆回転設定 B
    var targetB = new THREE.Object3D();
    targetB.position.y = 0;
    targetB.rotation.x = -(Math.PI); // -> 180度


    // 座標＆回転設定 C
    var targetC = new THREE.Object3D();
    targetC.position.y = 0;
    targetC.rotation.x = -(Math.PI * (3/2)); // -> 270

    var targetD = new THREE.Object3D();
    targetD.position.y = 0;
    targetD.rotation.x = -(Math.PI * 2); // -> 360

    // // #aがクリックされたら 設定A 方向にアニメーション
    $("#a").click(function () {
        transform(targetA, 1000);
    });
    // // #aがクリックされたら 設定B 方向にアニメーション
    $("#b").click(function () {
        transform(targetB, 1000);
    });
    // // #aがクリックされたら 設定C 方向にアニメーション
    $("#c").click(function () {
        transform(targetC, 1000);
    });

    $("#d").click(function () {
        transform(targetD, 1000);
    });
    $("#e").click(function () {
        transform(target0, 0); // リセット
    });


    //ウィンドウリサイズ時、onWindowResize()を呼び出す
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    // カメラ設定
    camera.aspect = window.innerWidth / window.innerHeight; // カメラの縦横比を再設定
    camera.updateProjectionMatrix(); // 更新
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダリングサイズを再設定
}

function transform(target, duration) {

    TWEEN.removeAll(); // TWEEN処理が混在しないように一旦全て中止

    /*
    下記は座標と回転の2つに分けてアニメーション情報を設定し、
    メソッドチェーン最後尾のstart()でアニメーションを開始しています。
    */

    // 座標アニメーション処理
    // new TWEEN.Tween(object.position) // object（webyaバナー)のposition情報を使って座標アニメーションさせますよ
    new TWEEN.Tween(dice.position) // object（webyaバナー)のposition情報を使って座標アニメーションさせますよ
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration) // x,y,z移動先と所要時間
        .easing(TWEEN.Easing.Exponential.InOut) // アニメーションパターン
        .start(); // 設定が住んだら開始!!

    // 回転アニメーション処理
    // new TWEEN.Tween(object.rotation) // object（webyaバナー)のposition情報を使って回転アニメーションさせますよ
    new TWEEN.Tween(dice.rotation) // object（webyaバナー)のposition情報を使って回転アニメーションさせますよ
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, duration) // x,y,z回転と所要時間
        .easing(TWEEN.Easing.Exponential.InOut) // アニメーションパターン
        .start(); // 設定が住んだら開始!!

    // フレーム描画処理
    new TWEEN.Tween(this)
        .to({}, duration)
        .onUpdate(render)
        .start();
}

/* ループ
requestAnimationFrameでフレームアニメーション化して
TWEENとcontrolsを更新しています。
これは決まり文句的なものです
*/

function animate() {
    requestAnimationFrame(animate); // three.js 内関数
    TWEEN.update(); // tween更新
    controls.update(); // 位置更新
}

// TWEENでアニメーションする際に呼び出される
function render() {
    renderer.render(scene, camera);
}
