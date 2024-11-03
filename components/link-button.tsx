import { Link, type LinkProps } from 'expo-router'
import { type ReactNode } from 'react'

import Button from '@/components/button';

interface Props extends LinkProps<any> {
  children: ReactNode
}

export default function LinkButton({ href, onPress, children, ...rest }: Props) {
  return (
    <Link href={href} asChild onPress={onPress} {...rest}>
      <Button>
        {children}
      </Button>
    </Link>
  )
}
