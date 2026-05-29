class Matrix {
    constructor(n,m) {
        this.n = n;
        this.m = m;
        this.matrix = [];
        this.e=document.createElement("div");
        this.e.classList.add("matrix");
        this.e.style.height=`${n*6}rem`;
        this.e.style.width=`${m*6}rem`;
        for (let i=0;i<n;i++) {
            const r=[];
            for (let j=0;j<m;j++) r.push(0);
            this.matrix.push(r);

            const r_=document.createElement("div");
            for (let j=0;j<m;j++) {
                const s=document.createElement("span");
                s.innerText=0;
                r_.appendChild(s);
            }
            this.e.appendChild(r_);
        }
    }
    get(i,j) {
        return this.matrix[i][j];
    }
    set(i,j,v) {
        this.matrix[i][j]=v;
        this.e.children[i].children[j].innerText=v;
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
        e.appendChild(this.e);
    }
    revokeParent(e) {
        e.removeChild(this.e);
    }
}