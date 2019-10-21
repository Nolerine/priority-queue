class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null){
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
		} else if (this.right == node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error;
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			let obj1 = this.left;			// could be null
			let obj2 = this.right;			// could be null
			let obj3 = this.parent.left;	// could be null or this
			let obj4 = this.parent.right;	// could be null or this
			let obj5 = this.parent;
			let obj6 = this.parent.parent;	// could be null
			
			//moving up this and updating his old neighbour
			this.parent = obj6;
			if (obj3 == this) {
				this.left = obj5;
				this.right = obj4;
				if (obj4 != null) {
					obj4.parent = this;
				}	
			} else {
				this.left = obj3;
				this.right = obj5;
				if (obj3 != null) {
					obj3.parent = this;
				}
			}
			
			// moving down parent
			obj5.parent = this;
			obj5.left = obj1;
			obj5.right = obj2;

			// updating children
			if (obj1 != null) {
				obj1.parent = obj5;
			}
			if (obj2 != null) {
				obj2.parent = obj5;
			}

			//updating grandparent
			if (obj6 != null) {
				if (obj6.left == obj5) {
					obj6.left = this;
				} else {
					obj6.right = this;
				}
			}
		}
	}
}

module.exports = Node;
