import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Programming languages with their respective quizzes
const programmingLanguages = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'A versatile and beginner-friendly programming language',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'Basic Python concepts and syntax',
        questions: [
          {
            id: 1,
            question: 'What is the correct way to create a variable in Python?',
            options: [
              'var x = 5',
              'x = 5',
              'let x = 5',
              'const x = 5'
            ],
            correctAnswer: 1,
            explanation: 'In Python, variables are created using the assignment operator (=) without any keyword.'
          },
          {
            id: 2,
            question: 'Which of the following is a valid Python list?',
            options: [
              '[1, 2, 3]',
              '(1, 2, 3)',
              '{1, 2, 3}',
              '<1, 2, 3>'
            ],
            correctAnswer: 0,
            explanation: 'Lists in Python are created using square brackets [].'
          },
          {
            id: 3,
            question: 'What is the output of print(type(3.14))?',
            options: [
              '<class "int">',
              '<class "float">',
              '<class "number">',
              '<class "decimal">'
            ],
            correctAnswer: 1,
            explanation: '3.14 is a floating-point number in Python.'
          },
          {
            id: 4,
            question: 'Which method is used to add an element to a list?',
            options: [
              'list.add()',
              'list.append()',
              'list.insert()',
              'list.push()'
            ],
            correctAnswer: 1,
            explanation: 'The append() method adds an element to the end of a list.'
          },
          {
            id: 5,
            question: 'What is the correct way to create a function in Python?',
            options: [
              'function myFunc():',
              'def myFunc():',
              'create myFunc():',
              'func myFunc():'
            ],
            correctAnswer: 1,
            explanation: 'Functions in Python are defined using the def keyword.'
          },
          {
            id: 6,
            question: 'Which operator is used for exponentiation in Python?',
            options: [
              '^',
              '**',
              '^^',
              'pow'
            ],
            correctAnswer: 1,
            explanation: 'The ** operator is used for exponentiation in Python.'
          },
          {
            id: 7,
            question: 'What is the output of print("Hello" * 3)?',
            options: [
              'HelloHelloHello',
              'Hello 3',
              'Error',
              'HelloHello'
            ],
            correctAnswer: 0,
            explanation: 'Multiplying a string by a number repeats the string that many times.'
          },
          {
            id: 8,
            question: 'Which of these is a valid Python comment?',
            options: [
              '// This is a comment',
              '/* This is a comment */',
              '# This is a comment',
              '<!-- This is a comment -->'
            ],
            correctAnswer: 2,
            explanation: 'Python uses # for single-line comments.'
          },
          {
            id: 9,
            question: 'What is the result of 5 // 2?',
            options: [
              '2.5',
              '2',
              '3',
              '2.0'
            ],
            correctAnswer: 1,
            explanation: 'The // operator performs integer division, discarding the decimal part.'
          },
          {
            id: 10,
            question: 'Which of these is a valid Python dictionary?',
            options: [
              '{1, 2, 3}',
              '[1, 2, 3]',
              '{1: "one", 2: "two"}',
              '(1, 2, 3)'
            ],
            correctAnswer: 2,
            explanation: 'Dictionaries in Python use curly braces with key-value pairs.'
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Advanced Python concepts and data structures',
        questions: [
          {
            id: 1,
            question: 'What is the output of list comprehension [x for x in range(5) if x % 2 == 0]?',
            options: [
              '[0, 2, 4]',
              '[1, 3, 5]',
              '[0, 1, 2, 3, 4]',
              '[2, 4, 6]'
            ],
            correctAnswer: 0,
            explanation: 'The list comprehension creates a list of even numbers from 0 to 4.'
          },
          {
            id: 2,
            question: 'What does the @property decorator do?',
            options: [
              'Makes a method private',
              'Converts a method to a property',
              'Makes a method static',
              'Makes a method asynchronous'
            ],
            correctAnswer: 1,
            explanation: 'The @property decorator converts a method into a read-only property.'
          },
          {
            id: 3,
            question: 'What is the output of print([1, 2, 3][-1])?',
            options: [
              '1',
              '2',
              '3',
              'Error'
            ],
            correctAnswer: 2,
            explanation: 'Negative indices in Python count from the end of the list.'
          },
          {
            id: 4,
            question: 'Which of these is a valid way to create a set?',
            options: [
              'set([1, 2, 3])',
              '{1, 2, 3}',
              'Both A and B',
              'None of the above'
            ],
            correctAnswer: 2,
            explanation: 'Both set() constructor and curly braces can be used to create sets.'
          },
          {
            id: 5,
            question: 'What is the purpose of the __init__ method?',
            options: [
              'To initialize class variables',
              'To create a new instance',
              'To destroy an instance',
              'To convert a class to a string'
            ],
            correctAnswer: 0,
            explanation: 'The __init__ method is called when creating a new instance and initializes its attributes.'
          },
          {
            id: 6,
            question: 'What is the output of print("Hello".upper())?',
            options: [
              'hello',
              'HELLO',
              'Hello',
              'Error'
            ],
            correctAnswer: 1,
            explanation: 'The upper() method converts all characters to uppercase.'
          },
          {
            id: 7,
            question: 'Which of these is a valid way to handle exceptions?',
            options: [
              'try/except',
              'try/catch',
              'try/finally',
              'All of the above'
            ],
            correctAnswer: 0,
            explanation: 'Python uses try/except for exception handling.'
          },
          {
            id: 8,
            question: 'What is the purpose of the yield keyword?',
            options: [
              'To return a value from a function',
              'To create a generator function',
              'To pause program execution',
              'To raise an exception'
            ],
            correctAnswer: 1,
            explanation: 'The yield keyword is used to create generator functions that can be iterated over.'
          },
          {
            id: 9,
            question: 'What is the output of print(len("Hello"))?',
            options: [
              '4',
              '5',
              '6',
              'Error'
            ],
            correctAnswer: 1,
            explanation: 'The len() function returns the number of characters in a string.'
          },
          {
            id: 10,
            question: 'Which of these is a valid way to import a module?',
            options: [
              'import module',
              'from module import *',
              'import module as m',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'All of these are valid ways to import modules in Python.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complex Python concepts and algorithms',
        questions: [
          {
            id: 1,
            question: 'What is the time complexity of a binary search algorithm?',
            options: [
              'O(1)',
              'O(log n)',
              'O(n)',
              'O(n²)'
            ],
            correctAnswer: 1,
            explanation: 'Binary search has a time complexity of O(log n) as it divides the search space in half with each iteration.'
          },
          {
            id: 2,
            question: 'What is the purpose of the __slots__ attribute?',
            options: [
              'To define class methods',
              'To restrict attribute creation',
              'To create class properties',
              'To define class constants'
            ],
            correctAnswer: 1,
            explanation: '__slots__ is used to restrict the attributes that can be created in a class instance.'
          },
          {
            id: 3,
            question: 'What is the output of print([x for x in range(10) if x % 2 == 0][::2])?',
            options: [
              '[0, 4, 8]',
              '[0, 2, 4, 6, 8]',
              '[2, 6]',
              '[0, 2, 4]'
            ],
            correctAnswer: 0,
            explanation: 'This creates a list of even numbers and then takes every second element.'
          },
          {
            id: 4,
            question: 'What is the purpose of the @staticmethod decorator?',
            options: [
              'To make a method private',
              'To make a method instance-independent',
              'To make a method asynchronous',
              'To make a method a property'
            ],
            correctAnswer: 1,
            explanation: '@staticmethod creates a method that doesn\'t require an instance or class reference.'
          },
          {
            id: 5,
            question: 'What is the output of print(sorted([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))?',
            options: [
              '[1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]',
              '[9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1]',
              '[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]',
              'Error'
            ],
            correctAnswer: 0,
            explanation: 'sorted() returns a new sorted list in ascending order.'
          },
          {
            id: 6,
            question: 'What is the purpose of the __call__ method?',
            options: [
              'To make a class callable',
              'To initialize a class',
              'To destroy a class',
              'To convert a class to a string'
            ],
            correctAnswer: 0,
            explanation: '__call__ makes instances of a class callable like functions.'
          },
          {
            id: 7,
            question: 'What is the output of print(list(map(lambda x: x**2, [1, 2, 3, 4, 5])))?',
            options: [
              '[1, 4, 9, 16, 25]',
              '[1, 2, 3, 4, 5]',
              '[2, 4, 6, 8, 10]',
              'Error'
            ],
            correctAnswer: 0,
            explanation: 'map() applies the lambda function to each element, squaring each number.'
          },
          {
            id: 8,
            question: 'What is the purpose of the __enter__ and __exit__ methods?',
            options: [
              'To handle context management',
              'To handle class initialization',
              'To handle class destruction',
              'To handle method overloading'
            ],
            correctAnswer: 0,
            explanation: 'These methods are used to implement the context manager protocol for with statements.'
          },
          {
            id: 9,
            question: 'What is the output of print([x for x in range(10) if x % 2 == 0 and x % 3 == 0])?',
            options: [
              '[0, 6]',
              '[0, 2, 4, 6, 8]',
              '[6]',
              '[0, 3, 6, 9]'
            ],
            correctAnswer: 0,
            explanation: 'This creates a list of numbers that are both even and divisible by 3.'
          },
          {
            id: 10,
            question: 'What is the purpose of the __new__ method?',
            options: [
              'To create a new instance',
              'To initialize an instance',
              'To destroy an instance',
              'To convert an instance to a string'
            ],
            correctAnswer: 0,
            explanation: '__new__ is called before __init__ and is responsible for creating the instance.'
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '📜',
    description: 'The language of the web, essential for modern development',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'Basic JavaScript concepts and DOM manipulation',
        questions: [
          {
            id: 1,
            question: 'Which of the following is not a JavaScript data type?',
            options: ['Boolean', 'Integer', 'String', 'Object'],
            correctAnswer: 1,
            explanation: 'JavaScript uses Number type instead of Integer.'
          },
          {
            id: 2,
            question: 'What is the correct way to declare a variable in modern JavaScript?',
            options: ['var x = 5;', 'let x = 5;', 'const x = 5;', 'All of the above'],
            correctAnswer: 3,
            explanation: 'All are valid, but let and const are preferred in modern JavaScript.'
          },
          {
            id: 3,
            question: 'What is the output of console.log(typeof [])?',
            options: ['array', 'object', 'list', 'undefined'],
            correctAnswer: 1,
            explanation: 'In JavaScript, arrays are objects, so typeof [] returns "object".'
          },
          {
            id: 4,
            question: 'Which method adds an element to the end of an array?',
            options: ['array.push()', 'array.append()', 'array.add()', 'array.insert()'],
            correctAnswer: 0,
            explanation: 'push() adds one or more elements to the end of an array.'
          },
          {
            id: 5,
            question: 'What is the correct way to write a JavaScript function?',
            options: ['function myFunc() {}', 'def myFunc() {}', 'void myFunc() {}', 'func myFunc() {}'],
            correctAnswer: 0,
            explanation: 'Functions in JavaScript are declared using the function keyword.'
          },
          {
            id: 6,
            question: 'What is the output of console.log(2 + "2")?',
            options: ['4', '22', 'Error', 'NaN'],
            correctAnswer: 1,
            explanation: 'JavaScript performs type coercion, converting 2 to a string and concatenating.'
          },
          {
            id: 7,
            question: 'Which operator is used for strict equality comparison?',
            options: ['==', '===', '=', '=>'],
            correctAnswer: 1,
            explanation: '=== checks both value and type equality.'
          },
          {
            id: 8,
            question: 'What is the purpose of the return statement?',
            options: ['To exit a function', 'To return a value from a function', 'To break a loop', 'To skip the next iteration'],
            correctAnswer: 1,
            explanation: 'return is used to send a value back from a function.'
          },
          {
            id: 9,
            question: 'Which of these is a valid way to create an object?',
            options: ['let obj = new Object();', 'let obj = {};', 'let obj = Object.create(null);', 'All of the above'],
            correctAnswer: 3,
            explanation: 'All of these are valid ways to create objects in JavaScript.'
          },
          {
            id: 10,
            question: 'What is the output of console.log(typeof null)?',
            options: ['null', 'undefined', 'object', 'number'],
            correctAnswer: 2,
            explanation: 'typeof null returns "object" due to a historical bug in JavaScript.'
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Advanced JavaScript concepts and modern features',
        questions: [
          {
            id: 1,
            question: 'What is the output of console.log([1, 2, 3].map(x => x * 2))?',
            options: ['[2, 4, 6]', '[1, 2, 3]', '[1, 4, 9]', 'Error'],
            correctAnswer: 0,
            explanation: 'map() creates a new array with the results of calling a function for every array element.'
          },
          {
            id: 2,
            question: 'What is a closure in JavaScript?',
            options: [
              'A function that has access to variables from its outer scope',
              'A way to close a browser window',
              'A method to end a program',
              'A type of loop'
            ],
            correctAnswer: 0,
            explanation: 'A closure is a function that has access to variables from its outer lexical scope.'
          },
          {
            id: 3,
            question: 'What is the purpose of the async keyword?',
            options: [
              'To make a function asynchronous',
              'To make a function synchronous',
              'To make a function private',
              'To make a function static'
            ],
            correctAnswer: 0,
            explanation: 'async makes a function return a Promise and allows the use of await.'
          },
          {
            id: 4,
            question: 'What is the output of console.log(Promise.resolve(1).then(x => x + 1).then(x => console.log(x)))?',
            options: ['1', '2', 'Promise', 'Error'],
            correctAnswer: 1,
            explanation: 'The Promise chain adds 1 to the initial value of 1.'
          },
          {
            id: 5,
            question: 'What is the purpose of the spread operator (...)?',
            options: [
              'To spread array elements or object properties',
              'To create a copy of an array',
              'To merge objects',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'The spread operator can be used for all these purposes.'
          },
          {
            id: 6,
            question: 'What is the output of console.log(Object.keys({a: 1, b: 2}))?',
            options: ['[1, 2]', '["a", "b"]', '{a: 1, b: 2}', 'Error'],
            correctAnswer: 1,
            explanation: 'Object.keys() returns an array of a given object\'s property names.'
          },
          {
            id: 7,
            question: 'What is the purpose of the bind() method?',
            options: [
              'To create a new function with a fixed this value',
              'To bind event listeners',
              'To bind data to a template',
              'To bind variables to a scope'
            ],
            correctAnswer: 0,
            explanation: 'bind() creates a new function with a fixed this value and optional arguments.'
          },
          {
            id: 8,
            question: 'What is the output of console.log([...new Set([1, 2, 2, 3, 3, 3])])?',
            options: ['[1, 2, 2, 3, 3, 3]', '[1, 2, 3]', '[3, 2, 1]', 'Error'],
            correctAnswer: 1,
            explanation: 'Set removes duplicates, and spread operator converts it back to an array.'
          },
          {
            id: 9,
            question: 'What is the purpose of the Symbol type?',
            options: [
              'To create unique identifiers',
              'To represent special characters',
              'To create mathematical symbols',
              'To represent currency'
            ],
            correctAnswer: 0,
            explanation: 'Symbols are used to create unique identifiers that can be used as object keys.'
          },
          {
            id: 10,
            question: 'What is the output of console.log(Array.from("hello"))?',
            options: ['["h", "e", "l", "l", "o"]', '"hello"', '[104, 101, 108, 108, 111]', 'Error'],
            correctAnswer: 0,
            explanation: 'Array.from() creates a new array from an array-like or iterable object.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complex JavaScript patterns and performance optimization',
        questions: [
          {
            id: 1,
            question: 'What is the time complexity of Array.prototype.includes()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 2,
            explanation: 'includes() has to scan the array linearly, making it O(n).'
          },
          {
            id: 2,
            question: 'What is the purpose of the Proxy object?',
            options: [
              'To create a proxy server',
              'To intercept and customize operations on an object',
              'To create a copy of an object',
              'To handle HTTP requests'
            ],
            correctAnswer: 1,
            explanation: 'Proxy allows you to intercept and customize operations on an object.'
          },
          {
            id: 3,
            question: 'What is the output of console.log(new Map([[1, 2], [3, 4]]).get(1))?',
            options: ['1', '2', '3', 'undefined'],
            correctAnswer: 1,
            explanation: 'Map.get() returns the value associated with the key 1.'
          },
          {
            id: 4,
            question: 'What is the purpose of the WeakMap?',
            options: [
              'To store weak references to objects',
              'To create a map with weak keys',
              'To handle memory leaks',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'WeakMap allows garbage collection of its keys and helps prevent memory leaks.'
          },
          {
            id: 5,
            question: 'What is the output of console.log(Reflect.has({a: 1}, "a"))?',
            options: ['true', 'false', '1', 'Error'],
            correctAnswer: 0,
            explanation: 'Reflect.has() checks if a property exists on an object.'
          },
          {
            id: 6,
            question: 'What is the purpose of the Generator function?',
            options: [
              'To generate random numbers',
              'To create iterable sequences',
              'To generate HTML',
              'To create new objects'
            ],
            correctAnswer: 1,
            explanation: 'Generator functions create iterable sequences that can be paused and resumed.'
          },
          {
            id: 7,
            question: 'What is the output of console.log(Array.prototype.flat.call([1, [2, 3], [4, [5, 6]]]))?',
            options: ['[1, 2, 3, 4, 5, 6]', '[1, [2, 3], [4, [5, 6]]]', '[1, 2, 3, 4, [5, 6]]', 'Error'],
            correctAnswer: 2,
            explanation: 'flat() by default only flattens one level deep.'
          },
          {
            id: 8,
            question: 'What is the purpose of the BigInt type?',
            options: [
              'To handle large integers',
              'To handle decimal numbers',
              'To handle complex numbers',
              'To handle binary numbers'
            ],
            correctAnswer: 0,
            explanation: 'BigInt allows representation of integers with arbitrary precision.'
          },
          {
            id: 9,
            question: 'What is the output of console.log(Object.getOwnPropertyDescriptor({a: 1}, "a"))?',
            options: [
              '{value: 1, writable: true, enumerable: true, configurable: true}',
              '{a: 1}',
              '1',
              'Error'
            ],
            correctAnswer: 0,
            explanation: 'getOwnPropertyDescriptor returns the property descriptor of an object.'
          },
          {
            id: 10,
            question: 'What is the purpose of the Atomics object?',
            options: [
              'To handle atomic operations',
              'To handle atomic bombs',
              'To handle atomic clocks',
              'To handle atomic structures'
            ],
            correctAnswer: 0,
            explanation: 'Atomics provides atomic operations for shared memory in multi-threaded environments.'
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'A robust, object-oriented programming language',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'Basic Java concepts and syntax',
        questions: [
          {
            id: 1,
            question: 'Which of these is not a primitive data type in Java?',
            options: ['int', 'String', 'boolean', 'char'],
            correctAnswer: 1,
            explanation: 'String is a class, not a primitive type in Java.'
          },
          {
            id: 2,
            question: 'What is the correct way to declare a constant in Java?',
            options: ['const int MAX = 100;', 'final int MAX = 100;', 'static int MAX = 100;', 'constant int MAX = 100;'],
            correctAnswer: 1,
            explanation: 'Java uses the final keyword to declare constants.'
          },
          {
            id: 3,
            question: 'Which of these is a valid way to create an array in Java?',
            options: ['int[] arr = new int[5];', 'int arr[] = new int[5];', 'int arr = new int[5];', 'Both A and B'],
            correctAnswer: 3,
            explanation: 'Both syntaxes are valid in Java for array declaration.'
          },
          {
            id: 4,
            question: 'What is the output of System.out.println(5 / 2)?',
            options: ['2.5', '2', '2.0', 'Error'],
            correctAnswer: 1,
            explanation: 'Integer division in Java truncates the decimal part.'
          },
          {
            id: 5,
            question: 'Which keyword is used to inherit a class in Java?',
            options: ['implements', 'extends', 'inherits', 'super'],
            correctAnswer: 1,
            explanation: 'extends is used for class inheritance in Java.'
          },
          {
            id: 6,
            question: 'What is the purpose of the static keyword?',
            options: ['To make a method non-inheritable', 'To make a method belong to the class rather than instances', 'To make a method constant', 'To make a method private'],
            correctAnswer: 1,
            explanation: 'static members belong to the class rather than instances.'
          },
          {
            id: 7,
            question: 'Which of these is a valid way to create a String in Java?',
            options: ['String s = "Hello";', 'String s = new String("Hello");', 'String s = String.valueOf("Hello");', 'All of the above'],
            correctAnswer: 3,
            explanation: 'All of these are valid ways to create a String in Java.'
          },
          {
            id: 8,
            question: 'What is the output of System.out.println("Hello" + 5)?',
            options: ['Hello5', 'Error', 'Hello 5', '5Hello'],
            correctAnswer: 0,
            explanation: 'Java performs string concatenation when adding a string and a number.'
          },
          {
            id: 9,
            question: 'Which of these is not a valid access modifier in Java?',
            options: ['public', 'private', 'protected', 'internal'],
            correctAnswer: 3,
            explanation: 'internal is not a Java access modifier (it\'s from C#).'
          },
          {
            id: 10,
            question: 'What is the purpose of the void keyword?',
            options: ['To indicate a method returns nothing', 'To indicate a method is empty', 'To indicate a method is virtual', 'To indicate a method is deprecated'],
            correctAnswer: 0,
            explanation: 'void indicates that a method doesn\'t return any value.'
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Advanced Java concepts and object-oriented programming',
        questions: [
          {
            id: 1,
            question: 'What is the purpose of the interface keyword?',
            options: ['To define a contract that classes must implement', 'To create a user interface', 'To define a new type', 'To create a template class'],
            correctAnswer: 0,
            explanation: 'Interfaces define a contract that implementing classes must follow.'
          },
          {
            id: 2,
            question: 'What is the output of System.out.println(Arrays.asList(1, 2, 3).stream().map(x -> x * 2).collect(Collectors.toList()))?',
            options: ['[2, 4, 6]', '[1, 2, 3]', 'Error', '[1, 4, 9]'],
            correctAnswer: 0,
            explanation: 'The stream operation multiplies each element by 2.'
          },
          {
            id: 3,
            question: 'What is the purpose of the synchronized keyword?',
            options: ['To make a method thread-safe', 'To make a method synchronous', 'To make a method static', 'To make a method private'],
            correctAnswer: 0,
            explanation: 'synchronized prevents multiple threads from executing a method simultaneously.'
          },
          {
            id: 4,
            question: 'What is the difference between ArrayList and LinkedList?',
            options: ['ArrayList is faster for random access, LinkedList is faster for insertions', 'ArrayList is faster for insertions, LinkedList is faster for random access', 'There is no difference', 'ArrayList is thread-safe, LinkedList is not'],
            correctAnswer: 0,
            explanation: 'ArrayList uses an array internally, while LinkedList uses a doubly-linked list.'
          },
          {
            id: 5,
            question: 'What is the purpose of the try-with-resources statement?',
            options: ['To handle exceptions', 'To automatically close resources', 'To create new resources', 'To manage memory'],
            correctAnswer: 1,
            explanation: 'try-with-resources automatically closes resources that implement AutoCloseable.'
          },
          {
            id: 6,
            question: 'What is the output of System.out.println(Optional.ofNullable(null).orElse("default"))?',
            options: ['null', 'default', 'Error', 'Optional.empty'],
            correctAnswer: 1,
            explanation: 'orElse() returns the default value when the Optional is empty.'
          },
          {
            id: 7,
            question: 'What is the purpose of the @Override annotation?',
            options: ['To indicate a method overrides a superclass method', 'To indicate a method is deprecated', 'To indicate a method is final', 'To indicate a method is static'],
            correctAnswer: 0,
            explanation: '@Override indicates that a method is intended to override a method in a superclass.'
          },
          {
            id: 8,
            question: 'What is the difference between == and .equals()?',
            options: ['== compares references, .equals() compares values', '== compares values, .equals() compares references', 'There is no difference', '== is for primitives, .equals() is for objects'],
            correctAnswer: 0,
            explanation: '== compares object references, while .equals() compares the actual values.'
          },
          {
            id: 9,
            question: 'What is the purpose of the volatile keyword?',
            options: ['To make a variable thread-safe', 'To make a variable constant', 'To make a variable public', 'To make a variable static'],
            correctAnswer: 0,
            explanation: 'volatile ensures that a variable is always read from and written to main memory.'
          },
          {
            id: 10,
            question: 'What is the output of System.out.println(Pattern.matches("\\d+", "123"))?',
            options: ['true', 'false', '123', 'Error'],
            correctAnswer: 0,
            explanation: 'The regex \\d+ matches one or more digits.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complex Java patterns and performance optimization',
        questions: [
          {
            id: 1,
            question: 'What is the time complexity of HashMap.get()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 0,
            explanation: 'HashMap provides constant time performance for get() operations.'
          },
          {
            id: 2,
            question: 'What is the purpose of the CompletableFuture class?',
            options: ['To handle asynchronous operations', 'To handle synchronous operations', 'To handle file operations', 'To handle database operations'],
            correctAnswer: 0,
            explanation: 'CompletableFuture is used for asynchronous programming in Java.'
          },
          {
            id: 3,
            question: 'What is the purpose of the ForkJoinPool?',
            options: ['To handle parallel processing', 'To handle file operations', 'To handle network operations', 'To handle database operations'],
            correctAnswer: 0,
            explanation: 'ForkJoinPool is designed for parallel processing of tasks.'
          },
          {
            id: 4,
            question: 'What is the purpose of the @FunctionalInterface annotation?',
            options: ['To indicate an interface has exactly one abstract method', 'To indicate an interface is deprecated', 'To indicate an interface is final', 'To indicate an interface is static'],
            correctAnswer: 0,
            explanation: '@FunctionalInterface indicates that an interface is a functional interface.'
          },
          {
            id: 5,
            question: 'What is the purpose of the Module system in Java 9+?',
            options: ['To provide better encapsulation', 'To provide better performance', 'To provide better security', 'All of the above'],
            correctAnswer: 3,
            explanation: 'The Module system provides better encapsulation, security, and performance.'
          },
          {
            id: 6,
            question: 'What is the purpose of the VarHandle class?',
            options: ['To provide atomic operations on variables', 'To provide variable handles', 'To provide variable types', 'To provide variable names'],
            correctAnswer: 0,
            explanation: 'VarHandle provides atomic operations on variables.'
          },
          {
            id: 7,
            question: 'What is the purpose of the StackWalker API?',
            options: ['To walk the stack trace', 'To walk the heap', 'To walk the memory', 'To walk the disk'],
            correctAnswer: 0,
            explanation: 'StackWalker provides a way to walk the stack trace efficiently.'
          },
          {
            id: 8,
            question: 'What is the purpose of the ProcessHandle interface?',
            options: ['To handle operating system processes', 'To handle Java processes', 'To handle database processes', 'To handle network processes'],
            correctAnswer: 0,
            explanation: 'ProcessHandle provides a way to handle operating system processes.'
          },
          {
            id: 9,
            question: 'What is the purpose of the Flow API?',
            options: ['To implement the Reactive Streams specification', 'To implement the Stream API', 'To implement the Process API', 'To implement the Module API'],
            correctAnswer: 0,
            explanation: 'Flow API implements the Reactive Streams specification.'
          },
          {
            id: 10,
            question: 'What is the purpose of the VarHandle.compareAndSet() method?',
            options: ['To perform atomic compare-and-set operations', 'To perform atomic get operations', 'To perform atomic set operations', 'To perform atomic add operations'],
            correctAnswer: 0,
            explanation: 'compareAndSet() performs atomic compare-and-set operations.'
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    description: 'A powerful language for system programming and game development',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner',
        description: 'Basic C++ concepts and syntax',
        questions: [
          {
            id: 1,
            question: 'Which of these is not a valid C++ data type?',
            options: ['int', 'string', 'bool', 'char'],
            correctAnswer: 1,
            explanation: 'string is not a primitive type in C++, it\'s std::string from the standard library.'
          },
          {
            id: 2,
            question: 'What is the correct way to declare a constant in C++?',
            options: ['const int MAX = 100;', 'final int MAX = 100;', 'static int MAX = 100;', 'constant int MAX = 100;'],
            correctAnswer: 0,
            explanation: 'C++ uses the const keyword to declare constants.'
          },
          {
            id: 3,
            question: 'Which of these is a valid way to create an array in C++?',
            options: ['int arr[5];', 'int* arr = new int[5];', 'std::array<int, 5> arr;', 'All of the above'],
            correctAnswer: 3,
            explanation: 'All of these are valid ways to create arrays in C++.'
          },
          {
            id: 4,
            question: 'What is the output of std::cout << 5 / 2?',
            options: ['2.5', '2', '2.0', 'Error'],
            correctAnswer: 1,
            explanation: 'Integer division in C++ truncates the decimal part.'
          },
          {
            id: 5,
            question: 'Which keyword is used to inherit a class in C++?',
            options: ['implements', 'extends', ':', 'inherits'],
            correctAnswer: 2,
            explanation: 'C++ uses : for class inheritance.'
          },
          {
            id: 6,
            question: 'What is the purpose of the static keyword?',
            options: ['To make a member belong to the class rather than instances', 'To make a member non-inheritable', 'To make a member constant', 'To make a member private'],
            correctAnswer: 0,
            explanation: 'static members belong to the class rather than instances.'
          },
          {
            id: 7,
            question: 'Which of these is a valid way to create a string in C++?',
            options: ['std::string s = "Hello";', 'string s = "Hello";', 'char* s = "Hello";', 'All of the above'],
            correctAnswer: 0,
            explanation: 'std::string is the proper way to create strings in modern C++.'
          },
          {
            id: 8,
            question: 'What is the output of std::cout << "Hello" << 5?',
            options: ['Hello5', 'Error', 'Hello 5', '5Hello'],
            correctAnswer: 0,
            explanation: 'C++ performs string concatenation when using the << operator.'
          },
          {
            id: 9,
            question: 'Which of these is not a valid access modifier in C++?',
            options: ['public', 'private', 'protected', 'internal'],
            correctAnswer: 3,
            explanation: 'internal is not a C++ access modifier (it\'s from C#).'
          },
          {
            id: 10,
            question: 'What is the purpose of the void keyword?',
            options: ['To indicate a function returns nothing', 'To indicate a function is empty', 'To indicate a function is virtual', 'To indicate a function is deprecated'],
            correctAnswer: 0,
            explanation: 'void indicates that a function doesn\'t return any value.'
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Advanced C++ concepts and object-oriented programming',
        questions: [
          {
            id: 1,
            question: 'What is the purpose of the virtual keyword?',
            options: ['To enable polymorphism', 'To make a function private', 'To make a function static', 'To make a function constant'],
            correctAnswer: 0,
            explanation: 'virtual enables polymorphism by allowing function overriding.'
          },
          {
            id: 2,
            question: 'What is the output of std::cout << std::vector<int>{1, 2, 3}.size()?',
            options: ['3', '4', 'Error', '0'],
            correctAnswer: 0,
            explanation: 'size() returns the number of elements in the vector.'
          },
          {
            id: 3,
            question: 'What is the purpose of the mutable keyword?',
            options: ['To allow modification of a member in a const method', 'To make a member constant', 'To make a member static', 'To make a member private'],
            correctAnswer: 0,
            explanation: 'mutable allows modification of a member even in const methods.'
          },
          {
            id: 4,
            question: 'What is the difference between vector and list?',
            options: ['vector is contiguous, list is linked', 'vector is linked, list is contiguous', 'There is no difference', 'vector is thread-safe, list is not'],
            correctAnswer: 0,
            explanation: 'vector uses contiguous memory, while list uses a doubly-linked list.'
          },
          {
            id: 5,
            question: 'What is the purpose of the RAII pattern?',
            options: ['To manage resources automatically', 'To manage memory manually', 'To manage threads', 'To manage files'],
            correctAnswer: 0,
            explanation: 'RAII (Resource Acquisition Is Initialization) manages resources automatically.'
          },
          {
            id: 6,
            question: 'What is the output of std::cout << std::optional<int>().value_or(42)?',
            options: ['42', '0', 'Error', 'null'],
            correctAnswer: 0,
            explanation: 'value_or() returns the default value when the optional is empty.'
          },
          {
            id: 7,
            question: 'What is the purpose of the override keyword?',
            options: ['To indicate a function overrides a base class function', 'To indicate a function is deprecated', 'To indicate a function is final', 'To indicate a function is static'],
            correctAnswer: 0,
            explanation: 'override indicates that a function is intended to override a base class function.'
          },
          {
            id: 8,
            question: 'What is the difference between & and &&?',
            options: ['& is lvalue reference, && is rvalue reference', '& is rvalue reference, && is lvalue reference', 'There is no difference', '& is for pointers, && is for references'],
            correctAnswer: 0,
            explanation: '& is for lvalue references, && is for rvalue references.'
          },
          {
            id: 9,
            question: 'What is the purpose of the volatile keyword?',
            options: ['To prevent compiler optimization', 'To make a variable constant', 'To make a variable public', 'To make a variable static'],
            correctAnswer: 0,
            explanation: 'volatile prevents compiler optimization of a variable.'
          },
          {
            id: 10,
            question: 'What is the output of std::cout << std::regex_match("123", std::regex("\\d+"))?',
            options: ['1', '0', '123', 'Error'],
            correctAnswer: 0,
            explanation: 'regex_match returns true (1) when the string matches the pattern.'
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced',
        description: 'Complex C++ patterns and performance optimization',
        questions: [
          {
            id: 1,
            question: 'What is the time complexity of std::map::find()?',
            options: ['O(log n)', 'O(1)', 'O(n)', 'O(n²)'],
            correctAnswer: 0,
            explanation: 'std::map::find() has logarithmic time complexity.'
          },
          {
            id: 2,
            question: 'What is the purpose of the std::future class?',
            options: ['To handle asynchronous operations', 'To handle synchronous operations', 'To handle file operations', 'To handle database operations'],
            correctAnswer: 0,
            explanation: 'std::future is used for asynchronous programming in C++.'
          },
          {
            id: 3,
            question: 'What is the purpose of the std::async function?',
            options: ['To run functions asynchronously', 'To run functions synchronously', 'To run functions in parallel', 'To run functions in sequence'],
            correctAnswer: 0,
            explanation: 'std::async runs functions asynchronously.'
          },
          {
            id: 4,
            question: 'What is the purpose of the [[nodiscard]] attribute?',
            options: ['To indicate a return value should not be ignored', 'To indicate a function is deprecated', 'To indicate a function is final', 'To indicate a function is static'],
            correctAnswer: 0,
            explanation: '[[nodiscard]] warns when a return value is ignored.'
          },
          {
            id: 5,
            question: 'What is the purpose of the std::variant class?',
            options: ['To hold a value of one of several types', 'To hold multiple values', 'To hold a single value', 'To hold no values'],
            correctAnswer: 0,
            explanation: 'std::variant can hold a value of one of several types.'
          },
          {
            id: 6,
            question: 'What is the purpose of the std::atomic class?',
            options: ['To provide atomic operations', 'To provide atomic types', 'To provide atomic functions', 'To provide atomic variables'],
            correctAnswer: 0,
            explanation: 'std::atomic provides atomic operations on variables.'
          },
          {
            id: 7,
            question: 'What is the purpose of the std::filesystem library?',
            options: ['To handle file system operations', 'To handle file operations', 'To handle directory operations', 'All of the above'],
            correctAnswer: 3,
            explanation: 'std::filesystem provides operations for file systems, files, and directories.'
          },
          {
            id: 8,
            question: 'What is the purpose of the std::shared_mutex class?',
            options: ['To provide shared/exclusive locking', 'To provide shared memory', 'To provide shared variables', 'To provide shared functions'],
            correctAnswer: 0,
            explanation: 'std::shared_mutex provides shared/exclusive locking for multiple readers.'
          },
          {
            id: 9,
            question: 'What is the purpose of the std::optional class?',
            options: ['To represent optional values', 'To represent optional types', 'To represent optional functions', 'To represent optional variables'],
            correctAnswer: 0,
            explanation: 'std::optional represents an optional value that may or may not exist.'
          },
          {
            id: 10,
            question: 'What is the purpose of the std::any class?',
            options: ['To hold a value of any type', 'To hold multiple values', 'To hold a single value', 'To hold no values'],
            correctAnswer: 0,
            explanation: 'std::any can hold a value of any type.'
          }
        ]
      }
    ]
  }
];

function Quizzes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Check authentication using localStorage token
    const token = localStorage.getItem('token');
    const isUserLoggedIn = token && token.length > 0;
    setIsAuthenticated(isUserLoggedIn);

    if (!isUserLoggedIn) {
      // Store the current path for redirect after login
      localStorage.setItem('quizRedirect', '/quizzes');
      navigate('/login');
    }
  }, [navigate]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === selectedLevel.questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < selectedLevel.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Programming Quizzes</h1>
          <p className="text-gray-400 text-lg">
            Test your programming knowledge and improve your skills
          </p>
        </div>

        {!selectedLanguage ? (
          // Language Selection Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmingLanguages.map((language) => (
              <button
                key={language.id}
                onClick={() => handleLanguageSelect(language)}
                className="group bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{language.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                  {language.name}
                </h3>
                <p className="text-gray-400 text-sm">{language.description}</p>
              </button>
            ))}
          </div>
        ) : !selectedLevel ? (
          // Level Selection
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Languages
              </button>
              <h2 className="text-2xl font-semibold text-white">
                {selectedLanguage.icon} {selectedLanguage.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedLanguage.levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level)}
                  className="group bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {level.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{level.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{level.questions.length} Questions</span>
                    <span className="group-hover:text-primary transition-colors duration-200">
                      Start Quiz →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : showResults ? (
          // Results Screen
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
              <p className="text-2xl text-primary mb-6">
                Your Score: {score} / {selectedLevel.questions.length}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
                >
                  Try Again
                </button>
                <button
                  onClick={() => {
                    setSelectedLevel(null);
                    setSelectedLanguage(null);
                  }}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Choose Another Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Quiz Screen
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedLevel(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Levels
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">
                  Question {currentQuestion + 1} of {selectedLevel.questions.length}
                </div>
                <div className="text-lg font-semibold text-white">
                  {selectedLanguage.name} - {selectedLevel.name}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {selectedLevel.questions[currentQuestion].question}
                </h3>
                <div className="space-y-4">
                  {selectedLevel.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        selectedAnswer === null
                          ? 'border-gray-700 hover:border-primary/50 hover:bg-gray-700/50'
                          : selectedAnswer === index
                          ? index === selectedLevel.questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : index === selectedLevel.questions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">{String.fromCharCode(65 + index)}.</span>
                        <span className="text-white">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <h4 className="text-sm font-semibold text-primary mb-2">Explanation:</h4>
                  <p className="text-gray-300">
                    {selectedLevel.questions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / selectedLevel.questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;