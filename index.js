(() => {
    let input = document.getElementById("input");
    let form = document.getElementById("form");
    let btn = document.getElementById("button");
    let ul = document.getElementById("list");
    let checkbox = document.getElementsByClassName('check');

    // ローカルストレージに保存する関数
    const saveDate = () => {
        let li = document.getElementsByTagName('li');
        let todos = [];
        for (let i = 0; i < li.length; i++) {
            todo = {
                text: li[i].innerText,
                completed: li[i].classList.contains('checked'),
            }
            todos.push(todo);
        }
        // JSON形式の配列としてローカルストレージに保存
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // ローカルストレージから取り出す関数
    const storageTask = JSON.parse(localStorage.getItem('todos'));
    if (storageTask) {
        let li = document.getElementsByTagName('li');
        storageTask.forEach(task => {
            add(task.text,task.completed);
        });
    }

    // enterキーの時に追加
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (input.value.length > 0) {
            add();
            saveDate();
            checkBox();
        }
    });

    // 追加ボタンの時に追加
    btn.addEventListener("clicka", function (event) {
        event.preventDefault();
        if (input.value.length > 0) {
            add();
            saveDate();
            checkBox();
        }
    });

    // checkboxの状態を取得
    let checkBox = () => {
        let li = document.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
            checkbox[i].addEventListener('change', function () {
                li[i].classList.toggle("checked");
                saveDate();
            });
        }
    }
    checkBox();

    // 入力したものを追加する関数
    function add(task,or) {
        const li = document.createElement("li");
        const label = document.createElement("label");
        let text = input.value;
        if (task) {
            text = task;
        }
        label.innerText = text;
        li.classList.add("add-item");
        ul.appendChild(li);
        li.appendChild(label);
        let check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('class', 'check');
        check.setAttribute('name', 'item');
        if (or){
            check.checked = true;
            li.classList.add('checked');
        }
        label.prepend(check);
        input.value = "";
    }

    // 完了したタスク（チェック項目）をスクレイピングする
    let checkCompleted = () => {
        let flag = false;
        let check = document.getElementsByClassName('check');
        let label = document.querySelectorAll('label');
        let li = document.getElementsByTagName('li');
        for (let i = 0; i < check.length; i++) {
            // i番目のチェックボックスがチェックされているかを判定
            if (check[i].checked) {
                flag = true;
                li[i].classList.add("delete");
            } else {
                li[i].classList.remove("delete");
            }
        }
        if (!flag) {
            alert("チェックボックスに完了が選択されていません。");
        }
    }

    // 完了したタスクを消す関数
    document.getElementById('delete').addEventListener('click', function () {

        const elm = document.getElementsByClassName('add-item');

        if (0 < elm.length) {
            checkCompleted();
            [...elm].forEach((v) => {
                if (v.classList.contains('delete')) {
                    return v.remove()
                }
            })
        } else {
            alert("追加されているタスクがありません");
        }
        saveDate();
    });
})();