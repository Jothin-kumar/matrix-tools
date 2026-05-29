class Matrix {
    constructor(n,m,editable=false,editCallback=()=>{}) {
        this.n = n;
        this.m = m;
        this.matrix = [];
        this.e_parent=document.createElement("div");
        this.e_parent.style.height=`${(m>n?m:n)*6}rem`;
        this.e_parent.style.width=`${(m>n?m:n)*6}rem`;
        this.e_parent.classList.add("matrix-parent");
        this.e=document.createElement("div");
        this.e_parent.appendChild(this.e);
        this.e.classList.add("matrix");
        this.e.style.height=`${n*6}rem`;
        this.e.style.width=`${m*6}rem`;
        for (let i=0;i<n;i++) {
            const r=[];
            for (let j=0;j<m;j++) r.push(0);
            this.matrix.push(r);

            const r_=document.createElement("div");
            for (let j=0;j<m;j++) {
                const s=document.createElement(editable ? "input" : "span");
                // s.type="number";
                s.value=0;
                s.innerText=0;
                r_.appendChild(s);
                if (editable) {
                    s.addEventListener("change",()=>{
                        let v=parseInt(s.value)%prime;
                        if (v !=NaN) {
                            while (v<0) v+=prime;
                            v%=prime;
                            this.set(i,j,v)
                            editCallback();
                        }
                        else s.value=this.get(i,j);
                    });
                    s.addEventListener("keydown",e=>{
                        if (e.key=="Enter") {
                            s.blur();
                        }
                    });
                }
            }
            this.e.appendChild(r_);
        }
    }
    get(i,j) {
        return this.matrix[i][j];
    }
    set(i,j,v) {
        const prev=this.matrix[i][j];
        this.matrix[i][j]=v;
        this.e.children[i].children[j].value=v;
        this.e.children[i].children[j].innerText=v;
        if (prev!=v) {
            this.select(i,j);
            setTimeout(()=>{
                this.unselect(i,j);
            },500);
        }
    }
    select(i,j) {
        this.e.children[i].children[j].classList.add("selected");
    }
    unselect(i,j) {
        this.e.children[i].children[j].classList.remove("selected");
    }
    highlight(i,j) {
        this.e.children[i].children[j].classList.add("highlighted");
    }
    unhighlight(i,j) {
        this.e.children[i].children[j].classList.remove("highlighted");
    }
    useParent(e) {
        e.appendChild(this.e_parent);
    }
    revokeParent(e) {
        e.removeChild(this.e_parent);
    }
    async transpose() {
        this.e.classList.toggle("transposed");
        for (let i=0;i<this.n;i++) {
            for (let j=0;j<this.m;j++) {
                if (i!==j) {
                    this.select(i,j);
                    setTimeout(()=>{
                        this.unselect(i,j);
                    },500+10000);
                }
            }
        }
        await new Promise(r=>setTimeout(r,10000));
    }
}