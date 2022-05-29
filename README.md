<div align="center">
  <h1>ProcessMaker UI TESTS</h1>
  <br/>
  <br/>
</div>


### Run Tests
```sh
npx cypress run --headed
```

If you want to execute the tests on headless mode you can do it with the following line:
```sh
npx cypress run
```

If you want to execute the specific tests you can do it with the following line:
```sh
npx cypress run --spec .\cypress\integration\tests\component/component.spec.js
```

If you want to execute the tests on specific browser you can do it with the following line:
```sh
npx cypress run --headed --browser firefox
```

### Run on other environment
```sh
npm run --env "username=dev.user,password=dev.password"
```
