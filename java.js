        const display = document.getElementById('display');
        const historyPanel = document.getElementById('historyPanel');
        const historyList = document.getElementById('historyList');
        const historyBtn = document.getElementById('historyBtn');
        let historyLog = [];
        let showingHistory = false;

        function showCalc() {
            showingHistory = false;
            display.style.display = 'block';
            historyPanel.style.display = 'none';
            historyBtn.classList.remove('active');
        }

        function showHistory() {
            showingHistory = true;
            display.style.display = 'none';
            historyPanel.style.display = 'block';
            historyBtn.classList.add('active');
            historyList.innerHTML = '';
            if (historyLog.length === 0) {
                historyList.innerHTML = '<div class="history-empty">No calculations yet.</div>';
            } else {
                historyLog.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'history-item';
                    div.innerHTML = '<span class="expr">' + item.expr + '</span><span class="result">= ' + item.result + '</span>';
                    div.addEventListener('click', () => { 
                        display.innerText = item.result; 
                        showCalc(); });
                    historyList.appendChild(div);
                });
            }
        }

        historyBtn.addEventListener('click', () => { 
            if (showingHistory) 
                showCalc(); 
            else 
                showHistory(); });

        document.getElementById('btn-ac').addEventListener('click', () => { 
            display.innerText = ''; 
            if (showingHistory) 
                showCalc(); });

        document.getElementById('btn-back').addEventListener('click', () => {
            if (showingHistory) { showCalc(); return; }
            if (display.innerText) 
            display.innerText = display.innerText.slice(0, -1);
        });
            let click = 0;
        document.getElementById('equal').addEventListener('click', () => {
            click = 1;
            if (showingHistory) { showCalc(); return; }
            if (display.innerText && display.innerText !== 'Error') {
                try {
                    const expression = display.innerText;
                    const result = eval(expression);
                    historyLog.unshift({ expr: expression, result: result });
                    display.innerText = result;
                } catch(err) { display.innerText = 'Error'; }
            }
        });

        const skipIds = ['btn-ac', 'btn-back', 'equal', 'historyBtn'];
        document.querySelectorAll('button').forEach(btn => {
            if (!skipIds.includes(btn.id)) {
                btn.addEventListener('click', (e) => {
                    if(click === 1) {
                        display.innerText = '';
                        click = 0;}
                    if (showingHistory) showCalc();
                    if (display.innerText === 'Error') display.innerText = '';
                    display.innerText += e.target.innerText;
                });
            }
        });