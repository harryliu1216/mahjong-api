## FindCondition

```
 @Condition({
    function:(val,allValues,fieldKey)=>Like(`%${val}%`),
    defaultValue:'',
    field: '', // 可以使用不同于列名字段
    validate:[InNotNull('不能为空'),Max(6,'长度不能超过6')]
 })
```
