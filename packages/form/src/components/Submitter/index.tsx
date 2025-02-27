import React from 'react';
import type { FormInstance, ButtonProps } from 'antd';
import { Button, Space } from 'antd';
import omit from 'omit.js';
import { useIntl } from '@ant-design/pro-provider';

/** @name 用于配置操作栏 */
export type SearchConfig = {
  /** @name 重置按钮的文本 */
  resetText?: React.ReactNode;
  /** @name 提交按钮的文本 */
  submitText?: React.ReactNode;
};

export type SubmitterProps<T = {}> = {
  /** @name 提交方法 */
  onSubmit?: (value?: T) => void;
  /** @name 重置方法 */
  onReset?: (value?: T) => void;
  /** @name 搜索的配置，一般用来配置文本 */
  searchConfig?: SearchConfig;
  /** @name 提交按钮的 props */
  submitButtonProps?: ButtonProps & { preventDefault?: boolean };
  /** @name 重置按钮的 props */
  resetButtonProps?: ButtonProps & { preventDefault?: boolean };
  /** @name 自定义操作的渲染 */
  render?:
    | ((
        props: SubmitterProps &
          T & {
            submit: () => void;
            reset: () => void;
          },
        dom: JSX.Element[],
      ) => React.ReactNode[] | React.ReactNode | false)
    | false;
};

/**
 * FormFooter 的组件，可以自动进行一些配置
 *
 * @param props
 */

const Submitter: React.FC<SubmitterProps & { form: FormInstance }> = (props) => {
  const intl = useIntl();
  if (props.render === false) {
    return null;
  }

  const {
    form,
    onSubmit,
    render,
    onReset,
    searchConfig = {},
    submitButtonProps,
    resetButtonProps = {},
  } = props;
  const submit = () => {
    form.submit();
    onSubmit?.();
  };

  const reset = () => {
    form.resetFields();
    requestAnimationFrame(() => {
      onReset?.();
    });
  };

  const {
    submitText = intl.getMessage('tableForm.submit', '提交'),
    resetText = intl.getMessage('tableForm.reset', '重置'),
  } = searchConfig;
  /** 默认的操作的逻辑 */
  const dom = [
    <Button
      {...omit(resetButtonProps, ['preventDefault'])}
      key="rest"
      onClick={(e) => {
        if (!resetButtonProps?.preventDefault) reset();
        resetButtonProps?.onClick?.(e);
      }}
    >
      {resetText}
    </Button>,
    <Button
      type="primary"
      {...omit(submitButtonProps || {}, ['preventDefault'])}
      key="submit"
      onClick={(e) => {
        if (!submitButtonProps?.preventDefault) submit();
        submitButtonProps?.onClick?.(e);
      }}
    >
      {submitText}
    </Button>,
  ];

  const renderDom = render ? render({ ...props, submit, reset }, dom) : dom;
  if (!renderDom) {
    return null;
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null;
    }
    return <Space>{renderDom}</Space>;
  }
  return renderDom as JSX.Element;
};

export default Submitter;
