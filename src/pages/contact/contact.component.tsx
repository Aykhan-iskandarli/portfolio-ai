import {useCallback} from 'react';
import {Button, Form, Input} from 'antd';
import {Routes} from 'router/routes';
import {profile} from 'core/configs/content.config';
import SeoComponent from 'core/shared/seo/seo.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import {successToast} from 'core/shared/toast/toast';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {GithubIcon, LinkedinIcon, MailIcon} from 'assets/images/icons/icons';
import {useSendContact} from './actions/contact.mutation';
import {useContactStyles} from './contact.style';
import {IContactForm} from './contact';

function ContactComponent() {
    const translate = useLocalization();
    const [form] = Form.useForm<IContactForm>();
    const {mutate: sendContact, isLoading} = useSendContact();
    const {layout, info, label, email, socials, social, card, cardTitle} = useContactStyles();

    const handleFinish = useCallback((values: IContactForm) => {
        sendContact(
            {form: values, subject: translate('contact_mail_subject', {name: values.name})},
            {
                onSuccess: () => {
                    successToast(translate('contact_success'));
                    form.resetFields();
                },
            },
        );
    }, [sendContact, translate, form]);

    return (
        <>
            <SeoComponent titleKey='contact_title' descriptionKey='contact_description' path={Routes.contact}/>
            <PageHeaderComponent
                title={translate('contact_title')}
                intro={translate('contact_intro')}
                color={colors.cartridgeContact}
            />

            <div className={layout}>
                <div className={info}>
                    <div>
                        <p className={label}>{translate('contact_email_label')}</p>
                        <a className={email} href={`mailto:${profile.email}`}>
                            <MailIcon/>
                            <span>{profile.email}</span>
                        </a>
                    </div>
                    <div>
                        <p className={label}>{translate('contact_social')}</p>
                        <ul className={socials}>
                            <li>
                                <a className={social} href={profile.github} target='_blank' rel='noopener noreferrer'>
                                    <GithubIcon/>
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li>
                                <a className={social} href={profile.linkedin} target='_blank' rel='noopener noreferrer'>
                                    <LinkedinIcon/>
                                    <span>LinkedIn</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <section className={card}>
                    <h2 className={cardTitle}>{translate('contact_form_title')}</h2>
                    <Form form={form} layout='vertical' requiredMark={false} onFinish={handleFinish}>
                        <Form.Item
                            label={translate('contact_name')}
                            name='name'
                            rules={[{required: true, whitespace: true, message: translate('contact_required')}]}
                        >
                            <Input size='large' autoComplete='name' maxLength={80}/>
                        </Form.Item>
                        <Form.Item
                            label={translate('contact_email')}
                            name='email'
                            rules={[
                                {required: true, message: translate('contact_required')},
                                {type: 'email', message: translate('contact_invalid_email')},
                            ]}
                        >
                            <Input size='large' type='email' autoComplete='email' maxLength={120}/>
                        </Form.Item>
                        <Form.Item
                            label={translate('contact_message')}
                            name='message'
                            rules={[{required: true, whitespace: true, message: translate('contact_required')}]}
                        >
                            <Input.TextArea rows={5} maxLength={2000} showCount/>
                        </Form.Item>
                        <Button type='primary' size='large' htmlType='submit' loading={isLoading} block>
                            {translate('contact_send')}
                        </Button>
                    </Form>
                </section>
            </div>
        </>
    );
}

export default ContactComponent;
