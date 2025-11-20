import React from 'react';

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}

const ConstructorDemo = () => {
  const person = new Person('Shruti');
  return <div>{person.greet()}</div>;
};

export default ConstructorDemo;
