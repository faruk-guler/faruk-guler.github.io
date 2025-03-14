# Diff Checker
[![](https://img.shields.io/docker/pulls/brensio/diff-checker?style=for-the-badge)](https://hub.docker.com/r/brensio/diff-checker)
[![](https://img.shields.io/github/release/brensio/diff-checker?style=for-the-badge)](https://github.com/brensio/diff-checker/releases)
[![](https://img.shields.io/github/license/brensio/diff-checker?style=for-the-badge)](https://github.com/brensio/diff-checker/blob/master/LICENSE)
[![](https://img.shields.io/github/issues/brensio/diff-checker?style=for-the-badge)](https://github.com/brensio/diff-checker/issues)
[![](https://img.shields.io/github/forks/brensio/diff-checker?style=for-the-badge)](https://github.com/brensio/diff-checker/network/members)
[![](https://img.shields.io/github/stars/brensio/diff-checker?style=for-the-badge)](https://github.com/brensio/diff-checker/stargazers)

## Introduction

This is a minimal web tool for text comparison made in JavaScript and PHP. 

## Usage

To use it, simply paste the original text into the first field and the modified text into the second one, then click `compare text`.

You can identify the lines that have been changed as follows:
```
line number    | original text >> modified text
```

Lines with no changes have the format:
```
line number    | original text
```

Then finally, lines removed:
```
line number    | [Removed] original text
```

### Example

![diff-checker](https://i.imgur.com/MtffLvK.png)

## Download

### Docker Hub

```
docker pull brensio/diff-checker
```
