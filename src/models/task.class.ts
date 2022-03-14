export class Task {
    header!: string;
    description!: string;
    dueDate!: number;
    user!: string;

    
    constructor(obj?: any) {
      this.header = obj ? obj.header : '';
      this.description = obj ? obj.description : '';
      this.dueDate = obj ? obj.dueDate : '';
      this.user = obj ? obj.user : '';
    
    }
  
    public toJson() {
      return {
        header: this.header,
        description: this.description,
        dueDate: this.dueDate,
        user: this.user,
        
      };
    }
  }