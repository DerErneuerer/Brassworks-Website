import { createFileRoute } from "@tanstack/react-router";
import { Button, Page, PageBody, PageHeader, Section } from "brassui-react";

export const Route = createFileRoute("/")({ component: IndexRoute });

function IndexRoute() {
    return (
        <Page>
            <PageHeader title="Hello world" />
            <PageBody>
                <Section title="">
                    <p>
                        This is a starter project for building a React
                        application with BrassUI
                    </p>
                    <p>
                        <Button>Example Button</Button>
                    </p>
                </Section>
            </PageBody>
        </Page>
    );
}
