# Скрипт минтит NFT EIGENWORLDS - BASE LAYER

Тоже самое можно сделать вручную на https://mint.eigenlayer.xyz/

Для запуска скрипта нужен Node.js, если ещё не установлен, устанавливаем с
https://nodejs.org/en

НЕ УСТАНАВЛИВАЙТЕ версию Current, ставьте версию LTS!

Запускаем терминал, переходим в терминале в папку с eigenlayer-mint

Выполняем команды:

```
npm install
```

ждём когда установятся все зависимости если появились ошибки, пробуем команду

```
npm install --legacy-peer-deps
```

## Принцип работы

Добавляем приватные ключи в файл keys.txt каждый ключ на новой строке

Опционально, можно добавить слова в файл words.txt каждое слово на новой строке.
Слова можно не добавлять, тогда они сгенерируются автоматически из словаря
библиотекой https://github.com/andreasonny83/unique-names-generator

Если добавляете слова, их должно быть строго столько же сколько приватников,
иначе слова будут сгенерированы автоматически.

## Настройки в файле constants.ts:

`export const DELAY_FROM_SEC = 100` - минимальное время ожидания в секундах
между кошельками

`export const DELAY_TO_SEC = 200` - максимальное время ожидания в секундах между
кошельками

`export const MAX_GAS_GWEI = 20` - максимальное количество GWEI в L1 чтобы
скрипт начал минтить, иначе ждёт более дешёвый газ

Запуск

```
npm start
```

## Поблагодарить автора можно отправив донат в любой evm сети на:

```
raznorabochiy.eth
raznorabochiy.arb
raznorabochiy.bnb
0xE8eAbec7CE9e8Bf78A766E8556E542BC2C9446ae
```
