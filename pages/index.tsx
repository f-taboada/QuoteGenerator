import React, {useEffect, useState} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
//Components
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle, RedSpan } from '@/components/QuoteGenerator/QuoteGeneratorElements'
//Assets
import Clouds1 from '@/assets/cloud-and-thunder.png'
import Clouds2 from '@/assets/cloudy-weather.png'
import { generateClient } from 'aws-amplify/api';
import { createQuoteAppData, updateQuoteAppData, deleteQuoteAppData } from '../src/graphql/mutations';
import { quoteQueryName } from '@/src/graphql/queries'


// Interface for our DynamoDb Object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// Type guard for our fetch function


export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)

  const client = generateClient();

  // Function to fetch our DynamoDb object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await client.graphql<UpdateQuoteInfoData>({
        query: quoteQueryName,
        authMode: 'iam',
        variables: {
          queryName: "LIVE",
        },
      })
      console.log('response', response);

    } catch (error) {
      console.log('Error getting quote data ' + error)
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])

  
  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A fun project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Background */}
      <GradientBackgroundCon>

        {/* Quote Generator Modal Pop-Up */} 
        {/* <QuoteGeneratorModal>

        </QuoteGeneratorModal> */}

        {/* Quote Generator */} 
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>

            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
            Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton>
              <GenerateQuoteButtonText
              // onClick={null}
              >
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>

          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>


        {/* Background Images*/} 
        <BackgroundImage1
          src={Clouds1}
          height="300"
          alt="cloudybackground1"
          />

        <BackgroundImage2
          src={Clouds2}
          height="300"
          alt="cloudybackground1"
          />          

        {/* Footer*/} 
        <FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed with <RedSpan>love</RedSpan> by <FooterLink href="https://github.com/f-taboada"
            target="_blank" rel="noopener noreferrer"> @FacundoTaboada </FooterLink>  
          </>
         </FooterCon>
      </GradientBackgroundCon>
    </>
  )
}
