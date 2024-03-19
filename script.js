// ページの読み込みが完了した時に実行される処理
document.addEventListener('DOMContentLoaded', function () {
    // ローカルストレージからメモを読み込む
    loadMemos();
});

// メモをロードして表示する関数
function loadMemos() {
    // メモ一覧の要素を取得
    const memoList = document.getElementById('memo-list');
    // メモ一覧を初期化
    memoList.innerHTML = '';
    // ローカルストレージからメモを取得
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    // 取得したメモを表示
    memos.forEach(function (memo, index) {
        // メモのタイトルを表示する要素を作成
        const memoItem = document.createElement('div');
        memoItem.innerHTML = `<div>${memo.title}</div>`;
        // クリック時にメモを表示するイベントを設定
        memoItem.addEventListener('click', function () {
            displayMemo(index);
        });
        // メモ一覧に追加
        memoList.appendChild(memoItem);
    });
}

// メモを編集画面に表示する関数
function displayMemo(index) {
    // ローカルストレージからメモを取得
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    // インデックスに対応するメモを取得（存在しない場合は空のメモ）
    const memo = memos[index] || { title: '', body: '' };
    // タイトルと本文を編集エリアに表示
    document.getElementById('memo-title').value = memo.title;
    document.getElementById('memo-body').value = memo.body;
    // 編集中のメモのインデックスを保存
    document.getElementById('memo-edit').setAttribute('data-index', index);
}

// 保存ボタンがクリックされた時の処理
document.getElementById('save-button').addEventListener('click', function () {
    // タイトルと本文を取得
    const title = document.getElementById('memo-title').value.trim();
    const body = document.getElementById('memo-body').value.trim();
    // タイトルと本文が入力されているかチェック
    if (title === '' || body === '') {
        alert('タイトルと本文を入力してください。');
        return;
    }
    // 文字数制限をチェック
    if (title.length > 100 || body.length > 1000) {
        alert('タイトルは100文字以内、本文は1000文字以内で入力してください。');
        return;
    }
    // ローカルストレージからメモを取得
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    // 編集中のメモのインデックスを取得
    const editIndex = parseInt(document.getElementById('memo-edit').getAttribute('data-index'));
    // 新しいメモを作成
    const memo = { title: title, body: body };
    // 編集中のメモがある場合は置換、ない場合は新規追加
    if (!isNaN(editIndex) && editIndex >= 0 && editIndex < memos.length) {
        memos[editIndex] = memo;
    } else {
        memos.push(memo);
    }
    // メモを保存してローカルストレージに保存
    localStorage.setItem('memos', JSON.stringify(memos));
    // メモ一覧を再読み込み
    loadMemos();
});

// 削除ボタンがクリックされた時の処理
document.getElementById('delete-button').addEventListener('click', function () {
    // 編集中のメモのインデックスを取得
    const editIndex = parseInt(document.getElementById('memo-edit').getAttribute('data-index'));
    // ローカルストレージからメモを取得
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    // インデックスに対応するメモを削除
    if (!isNaN(editIndex) && editIndex >= 0 && editIndex < memos.length) {
        memos.splice(editIndex, 1);
     // メモを保存してローカルストレージに保存
    localStorage.setItem('memos', JSON.stringify(memos));
    // メモ一覧を再読み込み
    loadMemos();
    // 編集エリアをクリア
    document.getElementById('memo-title').value = '';
    document.getElementById('memo-body').value = '';
    document.getElementById('memo-edit').removeAttribute('data-index');
} else {
    alert('削除するメモがありません。');
}
});

// 新規作成ボタンがクリックされた時の処理
document.getElementById('new-button').addEventListener('click', function () {
    // タイトルと本文を取得
    const title = '新規メモ';
    const body = '内容を入力してください';
    // ローカルストレージからメモを取得
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    // 新しいメモを作成
    const memo = { title: title, body: body };
    // メモを追加してローカルストレージに保存
    memos.push(memo);
    localStorage.setItem('memos', JSON.stringify(memos));
    // メモ一覧を再読み込み
    loadMemos();
});
