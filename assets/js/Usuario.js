export class User{
    static geradorId = 1;
    constructor(nome, idade){
        this.id = User.geradorId;
        this.nome = nome;
        this.idade = idade;
        User.geradorId++;
    }

}