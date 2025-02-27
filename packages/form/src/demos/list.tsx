﻿import React, { useState } from 'react';
import ProForm, {
  ProFormRadio,
  ProFormList,
  ProFormText,
  ProFormFieldSet,
  ProFormDigit,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-form';

const Demo = () => {
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  return (
    <>
      <ProFormRadio.Group
        fieldProps={{
          value: position,
          onChange: (e) => setPosition(e.target.value),
        }}
        options={[
          {
            label: '顶部',
            value: 'top',
          },
          {
            label: '底部',
            value: 'bottom',
          },
        ]}
      />
      <ProForm
        onFinish={async (values) => {
          console.log('Received values of form:', values);
        }}
      >
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" width="md" label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" label="商务经理" initialValue="启途" />
        <ProFormList
          name="users"
          label="用户信息"
          creatorButtonProps={{
            position,
          }}
          creatorRecord={{
            name: 'test',
          }}
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
              age: 111,
              birth: '2021-02-18',
              sex: 'man',
              addr: ['taiyuan', 'changfeng'],
            },
          ]}
        >
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="name"
            label="姓名"
          />
          <ProFormDigit name="age" label="年龄" />
          <ProFormSelect
            label="性别"
            name="sex"
            width="xs"
            valueEnum={{
              man: '男性',
              woman: '女性',
            }}
          />
          <ProFormFieldSet name="addr" label="地址">
            <ProFormSelect
              valueEnum={{
                taiyuan: '山西',
                hangzhou: '杭州',
              }}
            />
            <ProFormSelect
              valueEnum={{
                changfeng: '长风街',
                gongzhuan: '工专路',
              }}
            />
          </ProFormFieldSet>
          <ProFormDatePicker name="birth" label="出生日期" />
        </ProFormList>
      </ProForm>
    </>
  );
};

export default Demo;
