import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter from "./StickyFooter";
import SingleRow from "./SingleRow";
import HeaderSlider from "./HeaderSlider";

class TermsConditions extends React.Component {
    render() {
        
        return (
            <div>
                <Grid container spacing={0}>
                   
                    <Grid 
                        item
                        xs={12} 
                        sm={12}
                        md={12} 
                        lg={12}
                        xl={12}
                        
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/interns/intern-careers/math.png)`,
                            backgroundSize: 'cover',
                            height: '300px'
                        }}
                        >
                        <h2
                        style={{
                            color: 'white',
                            fontFamily:'IranSans',
                            float: 'right',
                            bottom: '0px',
                            fontSize: '36px',
                            top: '55%',
                            position: 'relative',
                            right: '4%',
                        }}
                        >
                            قوانین و مقررات
                        </h2>
                    </Grid>

                    <Grid item lg={12}
                    style={{
                        direction: 'rtl',
                        fontFamily: 'IranSans_Light',
                    }}
                    >
                    
                        <ul>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند اول
                            </span>
                                <ul>
                                    <li>
                                    افراد برای عضویت در سایت باید به قسمت عضویت مراجعه کنند. در این مرحله با وارد کردن اطلاعات لازم مانند نام و نام خانوادگی، نام کاربری ،رمز عبور و آدرس پست الکترونیکی و شماره تلفن همراه کد تایید عضویت برای آنان ارسال می‌شود که کاربران با وارد کردن آن، مراحل عضویت را تایید می‌کنند.
                                    <ul>
                                        <li>
                                            تبصره 1
                                            <ul>
                                                <li>
                                                کاربر باید رمز عبور و نام کاربری خود را حفظ نموده و چنانچه آن را فراموش کند، می‌تواند برای ثبت نام مجدد و اخذ کلمه عبور جدید اقدام کند.
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                            تبصره 2
                                            <ul>
                                                <li>
                                                کاربر باید آدرس پست الکترونیک خود را به همراه سایر اطلاعات درخواستی به‌طور صحیح اعلام نموده و مسئولیت ثبت اشتباه و یا خلاف واقع بر عهده شخص کاربر است.
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                            تبصره 3
                                            <ul>
                                                <li>
                                                عضویت در سایت فیزیک اپ رایگان است.
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                    </li>
                                    
                                
                                </ul>
                            </li>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند دوم
                            </span>
                                <ul>
                                    <li>
                                    فرایند خرید از سایت توسط کاربر به این شرح است:
                                    <ul>
                                        <li>
                                        قسمت اول
                                            <ul>
                                                <li>
                                                بازدید از محتوا و خدمات ارائه شده در سایت
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                        قسمت دوم
                                            <ul>
                                                <li>
                                                انتخاب طرح اشتراکی مورد نظر
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                        قسمت سوم
                                            <ul>
                                                <li>
                                                پرداخت مبلغ معین( یا اعمال کوپن ) به‌صورت آنلاین توسط خریدار
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                        قسمت چهارم
                                            <ul>
                                                <li>
                                                استفاده با دسترسی کامل از محتوای سایت تا مدا معین (بسته به نوع طرح انتخابی)
                                                </li>

                                            </ul>
                                        </li>
                                        <li>
                                        تبصره
                                            <ul>
                                                <li>
                                                چنانچه خریدار با هویت غیرواقعی اعم از نام، نام خانوادگی و … اقدام به خرید کند و موضوع مشخص شود، فیزیک اپ حق دارد سفارش را باطل کند. 
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                    </li>
                                    
                                
                                </ul>
                            </li>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند سوم
                            </span>
                                <ul>
                                    <li>
                                    حق امتیاز کلیه کالاها و محتویات این سایت برای تهیه کننده اثر محفوظ بوده و کلیه محتویات دارای مجوز رسمی از وزارت آموزش و پروش است  و هرگونه کپی‌برداری یا استفاده از بخش یا کل مطالب کالاها غیرمجاز بوده و پیگرد قانونی دارد.
                                    </li>
                                </ul>
                            </li>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند چهارم
                            </span>
                                <ul>
                                    <li>
                                    مدیریت سایت این اختیار را دارد تا در هر زمانی هر کاربری را که به هر دلیلی فعالیت های او مغایر با قوانین سایت باشد ، حذف کند.
                                    </li>
                                </ul>
                            </li>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند پنجم
                            </span>
                                <ul>
                                    <li>
                                    کاربر نباید در سایت ( تالار گفت‌وگو ، پرسشو پاسخ  و یا هر قسمت دیگر) اظهاراتی (Comment) را بگذارد و‌ یا اقدامی نماید که مبین نقض حقوق اشخاص دیگر باشد و یا عمل مجرمانه‌ای را به دنبال داشته باشد. همچنین کاربران نباید در خصوص امور مذهبی و سیاسی در این سایت اظهار نظر کنند. چنانچه هر یک از کاربران این ماده را رعایت نکنند، بلافاصله از سایت اخراج شده و چنانچه خریدی انجام داده باشند، وجه واریزی به آنان مسترد نمی‌شود. همچنین کاربر (عضو) حق استفاده از این سایت را  از دست می‌دهد.
                                    </li>
                                </ul>
                            </li>
                            <li>
                            <span
                            style={{
                                fontWeight: 'bold',
                            }}
                            >
                                بند ششم
                            </span>
                                <ul>
                                    <li>
                                    تمامی حقوق این سایت متعلق به شرکت " پیشگامان فناوری زندگی آرمانی " می‌باشد. 
این سایت در زمینه آموزش فیزیک و تحت قوانین جمهوری اسلامی ایران فعالیت می‌کند.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    
                    </Grid>
                    <StickyFooter />
                </Grid>
            </div>
        );
    }
}

export default TermsConditions;