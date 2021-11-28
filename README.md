# Sirene Invader

## 1 - Project architecture

![Image](https://cdn.discordapp.com/attachments/908788450621280336/914593665937207306/8fnlYBVAjWc9YAAAAASUVORK5CYII.png)

## 2 - Explanation

This project is simulating a worker pool;

1. I instatiate as much as possible workers
2. I store them in an array
3. I parse my file
4. For each new file, the worker array is shifter and the file is processed
   - If no worker available, then the file is pushed into a stack
5. Each worker parse its file and push a bulk of 6000 rows into mongo
6. When a worker is done processing, it sends a message to the main process
   - If the file stack is not empty and there is no workers, the worker shift the stack and process the file
   - Else, the worker is sent to the freeWorkers array
7. When the array of "need to be processed" file is empty, the process is done

## 3 - Predictions

Using 5k rows bulk, with my architecture and only parsing a 1 million rows file. Here are the results

![max rows](https://cdn.discordapp.com/attachments/908788450621280336/914612146736877639/unknown.png)

## 4 - What about pushin 31M rows into a fully local environement ?

Even with a fully setup mongo, I cant do more than 27 178 810 rows

![max rows](https://media.discordapp.net/attachments/908788450621280336/914593097684488212/unknown.png)

## 5 - How to run this project

`npm i && npm run start`

If you want to clean your workspace

`npm run clean`
