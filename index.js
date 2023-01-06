(() => {
    let input = document.getElementById("input");
    let form = document.getElementById("form");
    let btn = document.getElementById("button");
    let ul = document.getElementById("list");

    const storageTask = JSON.parse(localStorage.getItem('todos'));
    if (storageTask) {
        console.log('true');
        storageTask.forEach(task => {
            add(task);
        });
    } else {
        console.log('false');
    }

    // enterキーの時に追加
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (input.value.length > 0) {
            add();
            saveDate();
        }
    });

    // 追加ボタンの時に追加
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        if (input.value.length > 0) {
            add();
            saveDate();
        }
    });

    // 入力したものを追加する関数
    function add(task) {
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

    // ローカルストレージに保存する関数
    const saveDate = () => {
        let li = document.getElementsByTagName('li');
        let todos = [];
        for (let i = 0; i < li.length; i++) {
            todo = li[i].innerText;
            todos.push(todo);
        }
        // JSON形式の配列としてローカルストレージに保存
        localStorage.setItem('todos', JSON.stringify(todos));
    }
})();